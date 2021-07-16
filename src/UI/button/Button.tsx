import React from 'react'

import classes from './Button.module.sass'

interface IButton {
    type: string,
    disabled?: boolean,
    style?: {},
    clicked?: () => any
}


const Button: React.FC<IButton> = (props) => {
    
    let styles = [classes.Button]
    let onClick: any = props.clicked;
    
    if (props.type === "white") styles.push(classes.White)
    else if (props.type === "black") styles.push(classes.Black)

    if (props.disabled) {
        styles.push(classes.Disabled)
        onClick = null;
    }


    return (
        <div onClick={onClick} style={props.style} className={styles.join(' ')}>
            {props.children}
        </div>
    )
}

export default Button
