import React from 'react'
import Bg from '../bg/Bg'
 
import classes from './FullItem.module.sass'

interface IProps {
    visible: boolean,
    id?: string,
    type?: string,
    hide?: () => void,
}

const FullItem: React.FC<IProps> = (props) => {

    let styles = [classes.FullItemDiv]
    if (props.visible) styles.push(classes.Visible)
    else styles.push(classes.Hidden)

    let info: any;

    switch (props.type) {
        case 'Films':
            info = <p>films</p>
            break
        default:
            info = <p>2</p>
            break
    }


    return (
        <React.Fragment>
            <div className={styles.join(' ')}>
                {info}
            </div>
            <Bg visible={props.visible} hide={props.hide}/>
        </React.Fragment>
    )
}

export default FullItem
