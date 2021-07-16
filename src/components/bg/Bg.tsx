import React from 'react'

import classes from './Bg.module.sass'

interface IProps {
    visible: boolean,
    hide?: () => void,
}

const Bg: React.FC<IProps> = (props) => {

    let styles = [classes.Bg]


    if (props.visible) styles.push(classes.Visible)
    else styles.push(classes.Hidden)

    return (
        <div 
        className={styles.join(' ')}
        onClick={props.hide}/>
    )
}

export default Bg
