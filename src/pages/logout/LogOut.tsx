import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import Button from '../../UI/button/Button'
import { toLogOut } from '../../store/actionCreators/authActions'
import { Redirect } from 'react-router-dom'
import { RootState } from '../../store'

const LogOut: React.FC = () => {

    const auth = useSelector( (state: RootState) => state.auth )
    const dispatch = useDispatch()

    let redirect: any = <Redirect to="/"/>;
    if (auth.token) redirect = null;

    return (
        <div style={{display: 'flex', justifyContent: 'center'}}>
            <Button clicked={ () => dispatch(toLogOut(0)) } type="white">Log out</Button>  
            {redirect}
        </div>
    )
}

export default LogOut
