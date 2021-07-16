import React from 'react'
import { Switch, Route, useHistory, useLocation  } from 'react-router-dom'
import LogIn from './Login/Login'
import SignUp from './Signup/SignUp'

const Auth = () => {

    let history = useHistory();
    let location = useLocation();

    if (location.pathname === "/auth") history.push('/auth/signup')

    return (
        <div style={{color: 'white'}}>
            <Switch>
                <Route path="/auth/signup" component={SignUp}/>
                <Route path="/auth/login" component={LogIn}/>
            </Switch>
        </div>
    )
}

export default Auth
