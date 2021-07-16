import React from 'react'
import { useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'

import classes from './Header.module.sass'
import { RootState } from '../../store'

const Header = () => {

    const auth = useSelector((state: RootState) => state.auth)

    let changingLinks = (
        <React.Fragment>
            <NavLink activeStyle={{color: '#7bbfff'}} to="/auth/login" className={classes.Link}>Log in </NavLink>
            <NavLink activeStyle={{color: '#7bbfff'}} to="/auth/signup" className={classes.Link}>Sign up</NavLink>
        </React.Fragment>
    )
    if (auth.token) changingLinks = <NavLink activeStyle={{color: '#7bbfff'}} to="/logout" className={classes.Link}>Log out</NavLink>

    return (
        <div className={classes.Header}>
            <div className={classes.Icon}>
                <a href="/">
                    <p className={classes.IconUp}>STAR</p>
                    <p className={classes.IconDown}>WARS</p>
                </a>
            </div>
            <div className={classes.Line}/>
            <div className={classes.Links}>
                <NavLink activeStyle={{color: '#7bbfff'}} exact to="/" className={classes.Link}>Menu</NavLink>
                {changingLinks}
            </div>
        </div>
    )
}

export default Header
