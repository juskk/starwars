import React from 'react'
import { Redirect } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import classes from './SignUp.module.sass'
import Input from '../../../UI/input/Input'
import Button from '../../../UI/button/Button'
import { toAuth } from '../../../store/actionCreators/authActions'
import { RootState } from '../../../store'
import { removeError } from '../../../store/slices/auth'

const SignUp: React.FC = () => {

    // eslint-disable-next-line
    const auth = useSelector((state: RootState) => state.auth)
    const dispatch = useDispatch()

    React.useEffect( () => {
        dispatch(removeError())   
        // eslint-disable-next-line
    }, [] )

    const [email, setEmail] = React.useState({
        validation: {
            required: true,
        },
        valid: false,
        value: '',
        changed: false,
    })

    const [password1, setPassword1] = React.useState({
        validation: {
            required: true,
            minLength: 6,
        },
        valid: false,
        value: '',
        changed: false,
    })
    const [password2, setPassword2] = React.useState({
        validation: {
            required: true,
            minLength: 6,
        },
        valid: false,
        value: '',
        changed: false,
    })

    const [password, setPassword] = React.useState('')

    const [validForm, setValidForm] = React.useState(false);

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

    React.useEffect( () => {
        if (password.trim() !== '' && email.valid) setValidForm(true)
        else setValidForm(false)
    }, [password1.value, password2.value, email.value, password, email.valid] )


    const emailValidityCheck = (event: React.FormEvent<HTMLInputElement>) => {
        let newEmail = {...email, value: event.currentTarget.value}
        let emailValidity = validityCheck(newEmail)
        setEmail({...newEmail, valid: emailValidity, changed: true})
    }
    const password1ValidityCheck = (event: React.FormEvent<HTMLInputElement>) => {
        let newPassword = {...password1, value: event.currentTarget.value}
        let passwordValidity = validityCheck(newPassword)
        setPassword1({...newPassword, valid: passwordValidity, changed: true})

        if (event.currentTarget.value === password2.value && password1.value.trim() !== '' && passwordValidity) setPassword(event.currentTarget.value)
        else setPassword('')
    }
    const password2ValidityCheck = (event: React.FormEvent<HTMLInputElement>) => {
        let newPassword = {...password2, value: event.currentTarget.value}
        let passwordValidity = validityCheck(newPassword)
        setPassword2({...newPassword, valid: passwordValidity, changed: true})

        if (password1.value === event.currentTarget.value && password1.value.trim() !== '' && passwordValidity) setPassword(event.currentTarget.value)
        else setPassword('')
    }





    const authenticating = (email: string, password: string) => {
        dispatch(toAuth("signup", email, password))
    }

    let redirect = null;
    if (auth.token) redirect = <Redirect to="/"/>

    let loading = null;
    if (auth.loading) loading = <div>loading..</div>

    let errorMessage = null;
    if (auth.error) errorMessage = <p style={{color: 'red'}}>{auth.error}</p>

    console.log(password)

    return (
        <div className={classes.Div}>
            <p className={classes.Title}>Well, it's time to crate an account</p>
            <Input 
                text="Enter your email" 
                type="email" 
                value={email.value} 
                onChange={emailValidityCheck}
                error={email.changed ? !email.valid : false}/>

            <div>
                <Input 
                    text="Enter your password" 
                    type="password"
                    value={password1.value} 
                    onChange={password1ValidityCheck}
                    error={password1.changed ? !password1.valid : false}/>

                <Input 
                    text="Confirm your password" 
                    type="password"
                    value={password2.value} 
                    onChange={password2ValidityCheck}
                    error={password2.changed ? !password2.valid : false}/>
            </div>

            {errorMessage}

            <Button 
                style={{marginBottom: '30px', marginTop: '20px'} } 
                type="white"
                clicked={ () => authenticating(email.value, password) }
                disabled={!validForm}>
                    SIGN UP
            </Button>

            {loading}
            
            {redirect}
        </div>
    )
}

export default SignUp
