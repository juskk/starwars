import React from 'react'
import PreviewItem from '../previewItem/PreviewItem';
import FullItem from '../fullItem/FullItem';

import classes from './PreviewItems.module.sass'
import { ApolloError } from '@apollo/client';

interface IProps {
    items: any,
    selectedField: any,
    setFullItem: any,
    loading: boolean,
    error: ApolloError | undefined,
}

const PreviewItems: React.FC<IProps> = (props) => {
    let previewItems: any = null;

    if (props.items) {
        previewItems = props.items.map( (item: any, index: number) => {
            return <PreviewItem 
                    key={item.id + index} 
                    main={item.title || item.name} 
                    type={props.selectedField} 
                    id={item.id}
                    onClick={ () => props.setFullItem(
                        <FullItem 
                        id={item.id} 
                        type={props.selectedField} 
                        hide={ () => props.setFullItem(null) }/>
                        ) }
                    />
        } );
    }
    if (props.loading) {previewItems = <p>loading</p>}
    if (props.error) previewItems = <p>An error occurred</p>

    return (
        <div className={classes.PreviewItems}>
            {previewItems}
        </div>
    )
}

export default PreviewItems