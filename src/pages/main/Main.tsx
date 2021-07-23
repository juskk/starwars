import React from 'react'
import { useSelector } from 'react-redux'
import { useQuery } from '@apollo/client'

import classes from './Main.module.sass'
import { RootState } from '../../store'
import * as queryTypes from '../../graphql/query/index'
import SearchHistory from '../../components/searchHistory/SearchHistory'
import Search from '../../components/search/Search'
import PreviewItems from '../../components/previewItems/PreviewItems'

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
    const [link, setLink] = React.useState(queryTypes.GET_ALL_FILMS);
    const [items, setItems] = React.useState<any[]>([])
    const [basicItems, setBasicItems] = React.useState<any[]>([]);
    const [fullItem, setFullItem] = React.useState<any>(null)


    const [search, setSearch] = React.useState<string>('');
    const [history, setHistory] = React.useState<any[]>([])


    const [dropDownVisible, setDropDownVisible] = React.useState(true)

    

    React.useEffect( () => {
        switch (selectedField) {
            case 'Films':
                setLink(queryTypes.GET_ALL_FILMS)
                return
            case 'People':
                setLink(queryTypes.GET_ALL_PEOPLE)
                return
            case 'Planets':
                setLink(queryTypes.GET_ALL_PLANETS)
                return
            case 'Species':
                setLink(queryTypes.GET_ALL_SPECIES)
                return
            case 'Starships':
                setLink(queryTypes.GET_ALL_STARSHIPS)
                return
            case 'Vehicles':
                setLink(queryTypes.GET_ALL_VEHICLES)
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

    //------------------------------


    const changeSelectedField = (id: number) => {
        let newFields = fields;
        for (let item in newFields) {
            newFields[item].checked = false;
        }
        newFields[id].checked = true;
        setSearch('')
        setFields(newFields)
        setHistory([...history, {type: 'changedField', value: newFields[id].type}]) 
        setSelectedField(newFields[id].type)
    }
     


    const toSearch = (event: React.FormEvent<HTMLInputElement>) => {
        setSearch(event.currentTarget.value)
        setHistory([...history, {type: 'changedSearchParam', value: event.currentTarget.value}])
    }

    //-----------------------


    let pageInfo = <p className={classes.WarningText}>Log in to start</p>

    if (auth.token) pageInfo = (
        <div className={classes.Main}>

            <Search search={search} toSearch={toSearch} setDropDownVisible={setDropDownVisible} dropDownVisible={dropDownVisible} fields={fields} changeSelectedField={changeSelectedField}/>

            <div className={classes.MainBlock}>
                <PreviewItems 
                    items={items}
                    selectedField={selectedField}
                    setFullItem={setFullItem}
                    loading={loading}
                    error={error}/>

                <SearchHistory searchHistory={history}/>
            </div>

        </div>
    )

    if (fullItem) {
        pageInfo = fullItem
    }

    return (
        <div style={{color: 'white'}}>
            {pageInfo}
            <div style={{height: '30px', width: '100%'}}></div>
        </div>
    )
}

export default Main
