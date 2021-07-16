import React from 'react'

import classes from './Input.module.sass'

interface IProps{
    text?: string,
    value?: string,
    type?: string,
    error?: boolean,
    style?: {},
    onChange?: (event: React.FormEvent<HTMLInputElement>) => void,
}

const Input: React.FC<IProps> = (props) => {

    let styles = []

    if (props.error) styles.push(classes.Error)

    return (
        <div className={classes.Div}>
            <div>
                <p>{props.text}</p>
                <input 
                    style={props.style}
                    value={props.value} 
                    onChange={props.onChange} 
                    placeholder={props.text ? '' :  'Type here'} 
                    type={props.type}
                    className={styles.join(' ')}/>
            </div>
        </div>
    )
}

export default Input
