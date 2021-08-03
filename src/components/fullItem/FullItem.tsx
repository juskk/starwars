import { useQuery } from '@apollo/client';
import React from 'react'
import { post } from '../../graphql/fetchInfo';
import * as queryTypes from '../../graphql/query/index'
import SearchHistory from '../searchHistory/SearchHistory';
 
import classes from './FullItem.module.sass'

interface IProps {
    id?: string,
    type?: string,
    hide?: () => void,
}

const FullItem: React.FC<IProps> = ({id, type, hide}) => {

    const [info, setInfo] = React.useState<any>(null);
    const [link, setLink] = React.useState(queryTypes.GET_FILM);
    const [itemsId, setItemsId] = React.useState(id)

    const [checked, setChecked] = React.useState(false);

    const [history, setHistory] = React.useState<any[]>([])

    React.useEffect( () => {
        switch (type) {
            case 'Films':
                setLink(queryTypes.GET_FILM); break
            case 'People':
                setLink(queryTypes.GET_PERSON); break
            case 'Planets':
                setLink(queryTypes.GET_PLANET); break
            case 'Species':
                setLink(queryTypes.GET_SPECIE); break
            case 'Starships':
                setLink(queryTypes.GET_STARSHIP); break
            case 'Vehicles':
                setLink(queryTypes.GET_VEHICLE); break
        }
        setChecked(true)
        // console.log('[Changed started type]')
    }, [type] )

    const {data, loading} = useQuery(link, {
        variables: {id: itemsId},
        skip: !checked
    })

    const loadItem = (id: string, itemsType: string, value?: string) => {
        if (id !== itemsId) {
            setItemsId(id)
            let type = itemsType.toUpperCase();
            let historyType: string;
            if (type.includes('FILM')) {setLink(queryTypes.GET_FILM); historyType = 'Film'}
            else if (type.includes('SPECIE')) {setLink(queryTypes.GET_SPECIE); historyType = 'Specie'}
            else if (type.includes('STARSHIP')) {setLink(queryTypes.GET_STARSHIP); historyType = 'Starship'}
            else if (type.includes('VEHICLE')) {setLink(queryTypes.GET_VEHICLE); historyType = 'Vehicle'}
            else if (type.includes('PLANET') || type.includes('HOMEWORLD')) {setLink(queryTypes.GET_PLANET); historyType = 'Planet'}
            else if (type.includes('CHARACTER' )) {setLink(queryTypes.GET_PERSON); historyType = 'Character'}
            else if (type.includes('RESIDENT')) {setLink(queryTypes.GET_PERSON); historyType = 'Resident'}
            else if (type.includes('PEOPLE') || type.includes('PERSON')) {setLink(queryTypes.GET_PERSON); historyType = 'Person'}
            else if (type.includes('PILOT')) {setLink(queryTypes.GET_PERSON); historyType = 'Pilot'}
    
            setHistory(prev => [...prev, {type: 'changedItem', value: {type: historyType, value: value || 'value', id: id}}])
        }
        // console.log('[Changed type]')
    }

    React.useEffect( () => {

        if (info && history.length === 0) {
            let text: string;
            for (let item in data) {
                text = data[item].title || data[item].name
                setHistory([...history, {type: "changedItem", value: {type: data[item].__typename, value: text, id: itemsId}}])
            } 
        }
        // console.log('[Changed history]')
        setInfo(post(data, classes, loadItem))
        // console.log('[Changed post]')
        if (loading) setInfo(<p>loading</p>)
        // eslint-disable-next-line
    }, [link, data, loading] )

    return (
        <div className={classes.PageDiv}>
            
            <div className={classes.FullItemDiv}>
                <p className={classes.Back} onClick={hide}>leave</p>
                {info}
            </div>
           

            <SearchHistory searchHistory={history} clicked = { loadItem }/>

        </div>
    )
}

export default FullItem
