import { useQuery } from '@apollo/client';
import React from 'react'
import { post } from '../../query/fetchInfo';
import { GET_FILM } from '../../query/films';
import { GET_PERSON } from '../../query/people';
import { GET_PLANET } from '../../query/planets';
import { GET_SPECIE } from '../../query/species';
import { GET_STARSHIP } from '../../query/starships';
import { GET_VEHICLE } from '../../query/vehicles';
import SearchHistory from '../searchHistory/SearchHistory';
 
import classes from './FullItem.module.sass'

interface IProps {
    id?: string,
    type?: string,
    hide?: () => void,
}

const FullItem: React.FC<IProps> = ({id, type, hide}) => {

    const [info, setInfo] = React.useState<any>(null);
    const [link, setLink] = React.useState(GET_FILM);
    const [itemsId, setItemsId] = React.useState(id)

    const [checked, setChecked] = React.useState(false);

    const [history, setHistory] = React.useState<any[]>([])

    React.useEffect( () => {
        switch (type) {
            case 'Films':
                setLink(GET_FILM); break
            case 'People':
                setLink(GET_PERSON); break
            case 'Planets':
                setLink(GET_PLANET); break
            case 'Species':
                setLink(GET_SPECIE); break
            case 'Starships':
                setLink(GET_STARSHIP); break
            case 'Vehicles':
                setLink(GET_VEHICLE); break
        }
        setChecked(true)
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
            if (type.includes('FILM')) {setLink(GET_FILM); historyType = 'Film'}
            else if (type.includes('SPECIES')) {setLink(GET_SPECIE); historyType = 'Specie'}
            else if (type.includes('STARSHIP')) {setLink(GET_STARSHIP); historyType = 'Starship'}
            else if (type.includes('VEHICLE')) {setLink(GET_VEHICLE); historyType = 'Vehicle'}
            else if (type.includes('PLANET')) {setLink(GET_PLANET); historyType = 'Planet'}
            else if (type.includes('CHARACTER' )) {setLink(GET_PERSON); historyType = 'Character'}
            else if (type.includes('RESIDENT')) {setLink(GET_PERSON); historyType = 'Resident'}
            else if (type.includes('PERSON')) {setLink(GET_PERSON); historyType = 'Person'}
            else if (type.includes('PILOT')) {setLink(GET_PERSON); historyType = 'Pilot'}
    
            setHistory(prev => [...prev, {type: 'changedItem', value: {type: historyType, value: value || 'value', id: id}}])
        }
    }

    React.useEffect( () => {

        if (info && history.length === 0) {
            let text: string;
            for (let item in data) {
                text = data[item].title || data[item].name
                setHistory([...history, {type: "changedItem", value: {type: data[item].__typename, value: text, id: itemsId}}])
            } 
        }
        setInfo(post(data, classes, loadItem))
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
