import React from 'react'
import { useSelector } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLongArrowAltDown } from '@fortawesome/free-solid-svg-icons'

import classes from './Main.module.sass'
import { RootState } from '../../store'
import Input from '../../UI/input/Input'
import { useQuery } from '@apollo/client'
import { GET_ALL_FILMS } from '../../query/films'
import { GET_ALL_PEOPLE } from '../../query/people'
import PreviewItem from '../../components/previewItem/PreviewItem'
import { GET_ALL_PLANETS } from '../../query/planets'
import { GET_ALL_SPECIES } from '../../query/species'
import { GET_ALL_STARSHIPS } from '../../query/starships'
import { GET_ALL_VEHICLES } from '../../query/vehicles'
import FullItem from '../../components/fullItem/FullItem'

const Main = () => {

    const auth = useSelector((state: RootState) => state.auth)

    const [fields, setFields] = React.useState([
        {checked: true, type: 'Films', id: 0},
        {checked: false, type: 'People', id: 1},
        {checked: false, type: 'Planets', id: 2},
        {checked: false, type: 'Species', id: 3},
        {checked: false, type: 'Starships', id: 4},
        {checked: false, type: 'Vehicles', id: 5},
    ])
    const [selectedField, setSelectedField] = React.useState('Films')
    const [link, setLink] = React.useState(GET_ALL_FILMS);
    const [items, setItems] = React.useState<any[]>([])
    const [basicItems, setBasicItems] = React.useState<any[]>([]);

    const [search, setSearch] = React.useState<string>('');

    const [dropDownVisible, setDropDownVisible] = React.useState(true)

    const [fullItem, setFullItem] = React.useState<any>(<FullItem visible={false}/>)

    React.useEffect( () => {
        switch (selectedField) {
            case 'Films':
                setLink(GET_ALL_FILMS)
                return
            case 'People':
                setLink(GET_ALL_PEOPLE)
                return
            case 'Planets':
                setLink(GET_ALL_PLANETS)
                return
            case 'Species':
                setLink(GET_ALL_SPECIES)
                return
            case 'Starships':
                setLink(GET_ALL_STARSHIPS)
                return
            case 'Vehicles':
                setLink(GET_ALL_VEHICLES)
                return
        }
    }, [selectedField] )

    const {data, loading, error} = useQuery(link)
    React.useEffect( () => {
        for (let item in data) {
            for (let it in data[item]) {
                if (it !== '__typename') {
                    setItems(data[item][it])
                    setBasicItems(data[item][it])
                }
            }
        }
    }, [data] )

    React.useEffect( () => {
        if (search.trim() !== "") {
            let newItems = [];
            let checkingPhrase = search.toUpperCase()
            for (let item in basicItems) {
                let checkingProp = basicItems[item].name || basicItems[item].title
                let theCheackingProp = checkingProp.toUpperCase()
                if (theCheackingProp.includes(checkingPhrase)) {
                    newItems.push(basicItems[item])
                }
            }
            setItems(newItems)
        } else {
            setItems(basicItems) 
        }
    }, [search, basicItems] )

    let previewItems: any = null;

    const passFullItem = (id: string) => {
        setFullItem(
        <FullItem 
            visible={true} 
            id={id} 
            type={selectedField} 
            hide = { () => setFullItem (
                <FullItem 
                visible={false} 
                id={id} 
                type={selectedField} />
                )
            }/>
        )
    }


    if (items) {
        previewItems = items.map( item => {
            return <PreviewItem 
                    key={item.id} 
                    main={item.title || item.name} 
                    type={selectedField} 
                    id={item.id}
                    onClick={() => passFullItem(item.id)}/>
        } );
    }

    if (loading) {previewItems = <p>loading</p>}
    if (error) previewItems = <p>An error occurred</p>

    const changeSelectedField = (id: number) => {
        let newFields = fields;
        for (let item in newFields) {
            newFields[item].checked = false;
        }
        newFields[id].checked = true;
        setSearch('')
        setFields(newFields)
        setSelectedField(newFields[id].type)
    }
     



    

    let dropDownStyles = [classes.DropDown];
    if (dropDownVisible) dropDownStyles.push(classes.Visible)
    else dropDownStyles.push(classes.Hidden)

    const toSearch = (event: React.FormEvent<HTMLInputElement>) => {
        setSearch(event.currentTarget.value)
    }

    let pageInfo = <p className={classes.WarningText}>Log in to start</p>

    if (auth.token) pageInfo = (
        <div className={classes.Main}>
            <div className={classes.SearchBarDiv}>
                <div className={classes.SearchBar}>
                    <Input 
                        type="search"
                        value={search}
                        onChange = {toSearch}
                        style={{width: '400px', height: '50px', fontSize: '24px', letterSpacing: '2px'}}
                    />
                    <FontAwesomeIcon 
                    onClick={ () => setDropDownVisible(!dropDownVisible) } 
                    icon={faLongArrowAltDown} size="2x" className={classes.DropDownTrigger}/>
                </div>


                <div className={dropDownStyles.join(' ')}>
                    {fields.map( field => {
                        return (
                            <div key={field.id} className={classes.DropDownType}>
                                <input 
                                type="checkbox" 
                                checked={field.checked}
                                onChange={ () => changeSelectedField(field.id) }/>
                                <p>{field.type}</p>
                            </div>
                        )
                    } )}
                </div>

            </div>

            <div className={classes.PreviewItems}>
                {previewItems}
            </div>

            {fullItem}
        </div>
    )

    return (
        <div style={{color: 'white'}}>
            {pageInfo}
        </div>
    )
}

export default Main