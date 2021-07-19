import React from 'react'

import classes from './SearchHistory.module.sass'

interface IProps {
    searchHistory?: any[],
    clicked?: any
}

const SearchHistory: React.FC<IProps> = (props) => {
    return (
        <div className={classes.SearchHistory}>
            <p className={classes.Title}>Search history:</p>
            {props.searchHistory?.map( (item, index) => {
                let text: any;
                if (item.type === 'changedField') {
                    text =  <p  key={item.type + index} 
                                className={classes.Type}>
                                {item.value}
                            </p>
                } else if (item.type === 'changedSearchParam') {
                    text =  <p  key={item.type + index} 
                                className={classes.Text}>
                                {item.value}
                            </p>
                } else if (item.type === 'changedItem') {
                    text = <p   key={item.type + index} 
                                className={classes.Text}
                                onClick={() => props.clicked(item.value.id, item.value.type, item.value.value)}>
                                {item.value.type} : <span style={{color: 'white'}}>{item.value.value}</span>
                                </p>
                }
                return text
            } )}
        </div>
    )
}

export default SearchHistory
