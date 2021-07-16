import React from 'react'
import { Redirect } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import classes from './LogIn.module.sass'
import Input from '../../../UI/input/Input'
import Button from '../../../UI/button/Button'
import { toAuth } from '../../../store/actionCreators/authActions'
import { RootState } from '../../../store'


const LogIn: React.FC = () => {

    // eslint-disable-next-line
    const auth = useSelector((state: RootState) => state.auth)
    const dispatch = useDispatch()

    const [email, setEmail] = React.useState({
        validation: {
            required: true,
        },
        valid: false,
        value: '',
        changed: false,
    })

    const [password, setPassword] = React.useState({
        validation: {
            required: true,
            minLength: 6,
        },
        valid: false,
        value: '',
        changed: false,
    })

    const [validForm, setValidForm] = React.useState(false);

    const authenticating = (email: string, password: string) => {
        dispatch(toAuth("login", email, password))
    }

    let redirect = null;
    if (auth.token) redirect = <Redirect to="/"/>

    let loading = null;
    if (auth.loading) loading = <div>loading..</div>

    const validityCheck = (item: any) => {
        let valid = true;
        if (item.validation) {
            if (item.validation.required) {
                if (item.value.trim() !== '' && valid) valid = true
                else valid = false
            }
            if (item.validation.minLength) {
                if (item.value.length >= item.validation.minLength && valid) valid = true
                else valid = false
            }
        }
        return valid
    }

    const emailValidityCheck = (event: React.FormEvent<HTMLInputElement>) => {
        let newEmail = {...email, value: event.currentTarget.value}
        let emailValidity = validityCheck(newEmail)
        setEmail({...newEmail, valid: emailValidity, changed: true})

        if (emailValidity && password.valid) setValidForm(true)
        else setValidForm(false)
    }
    const passwordValidityCheck = (event: React.FormEvent<HTMLInputElement>) => {
        let newPassword = {...password, value: event.currentTarget.value}
        let passwordValidity = validityCheck(newPassword)
        setPassword({...newPassword, valid: passwordValidity, changed: true})

        if (email.valid && passwordValidity) setValidForm(true)
        else setValidForm(false)
    }
    // console.log(email)
    // console.log(password)
    let errorMessage = null;
    if (auth.error) errorMessage = <p style={{color: 'red'}}>{auth.error}</p>

    return (
        <div className={classes.Div}>
            
            <p className={classes.Title}>Well, it's time to log in!</p>
            <Input 
                text="Enter your email" 
                type="email" 
                value={email.value} 
                onChange={emailValidityCheck}
                error={email.changed ? !email.valid : false}/>
            
            <Input 
                text="Enter your password" 
                type="password"
                value={password.value} 
                onChange={passwordValidityCheck}
                error={password.changed ? !password.valid : false}/>

            {errorMessage}

            <Button 
                style={{marginBottom: '30px', marginTop: '20px'} } 
                disabled={!validForm}
                type="white"
                clicked={ () => authenticating(email.value, password.value) }>
                    SIGN UP
            </Button>

            {loading}
            
            {redirect}
        </div>
    )
}

export default LogIn
