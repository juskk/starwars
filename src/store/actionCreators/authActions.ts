import axios from "axios";
import { AppDispatch } from "../index";
import {startAuth ,authFail, authSuccess, logOut} from '../slices/auth'

export const toLogOut = (time: number) => {
    return (dispatch: AppDispatch) => {
        setTimeout( () => {
            localStorage.removeItem('token')
            localStorage.removeItem('localId')
            localStorage.removeItem('time')
            dispatch(logOut())
        }, time * 1000)
    }
}

export const toAuth = (type: string, email: string, password: string) => {
    return (dispatch: AppDispatch) => {
        dispatch(startAuth())
        let url = '';
        if (type === "signup") url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCo6ByJC9yhfj5AEai8WMKMSKdZQ9wpKAk'
        else if (type === "login") url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCo6ByJC9yhfj5AEai8WMKMSKdZQ9wpKAk'

        axios.post(url, 
        {email, password, returnSecureToken: true})
        .then( res => {
            let time: any = new Date(new Date().getTime() + res.data.expiresIn* 1000)
            localStorage.setItem('token', res.data.idToken)
            localStorage.setItem('localId', res.data.localId)
            localStorage.setItem('time', time)
            dispatch(authSuccess({localId: res.data.localId, token: res.data.idToken}))
            dispatch(toLogOut(+res.data.expiresIn))
        } )
        .catch( err => {
            dispatch(authFail(err.response.data.error.message)) //mb error. was err.message
        } )
    }
}

export const authCheck = () => {
    return (dispatch: AppDispatch) => {
        let token = localStorage.getItem('token');
        if (token) {
            let time: any = localStorage.getItem('time');
            let theTime: Date = new Date(time)
            if (theTime > new Date(Date.now())) {
                let localId = localStorage.getItem('localId')
                if (localId) {
                    dispatch(authSuccess({localId: localId, token: token }))
                    dispatch(toLogOut( ( theTime.getTime() - new Date().getTime() ) / 1000) )
                }


            } else dispatch(logOut())
        } else dispatch(logOut())
    } 
}