import React from 'react'

import classes from './PreviewItem.module.sass'

interface IProps {
    main: string,
    type: string,
    id: string,
    onClick?: () => void,
    additional1?: string,
    additional2?: string,
    additional3?: string,
}

const PreviewItem: React.FC<IProps> = (props) => {

    return (
        <div onClick={props.onClick} className={classes.Item}>
            <p>{props.main}</p>
            <p>{props.additional1}</p>
        </div>
    )
}

export default PreviewItem
