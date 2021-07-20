import React from 'react'
import Input from '../../UI/input/Input'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLongArrowAltDown } from '@fortawesome/free-solid-svg-icons'

import classes from './Search.module.sass'

interface IProps {
    search: any,
    toSearch: any,
    setDropDownVisible: any,
    dropDownVisible: any,
    fields: any,
    changeSelectedField: any
}

const Search: React.FC<IProps> = (props) => {

    let dropDownStyles = [classes.DropDown];
    if (props.dropDownVisible) dropDownStyles.push(classes.Visible)
    else dropDownStyles.push(classes.Hidden)

    return (
        <div className={classes.SearchBarDiv}>
                <div className={classes.SearchBar}>
                    <Input 
                        type="search"
                        value={props.search}
                        onChange = {props.toSearch}
                        style={{width: '400px', height: '50px', fontSize: '24px', letterSpacing: '2px'}}
                    />
                    <FontAwesomeIcon 
                    onClick={ () => props.setDropDownVisible(!props.dropDownVisible) } 
                    icon={faLongArrowAltDown} size="2x" className={classes.DropDownTrigger}/>
                </div>


                <div className={dropDownStyles.join(' ')}>
                    {props.fields.map( (field: any) => {
                        return (
                            <div key={field.id} className={classes.DropDownType}>
                                <input 
                                type="checkbox" 
                                checked={field.checked}
                                onChange={ () => props.changeSelectedField(field.id) }/>
                                <p>{field.type}</p>
                            </div>
                        )
                    } )}
                </div>

            </div>
    )
}

export default Search
