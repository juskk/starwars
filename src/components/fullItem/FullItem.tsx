import { useQuery } from '@apollo/client';
import React from 'react'
import { post } from '../../query/fetchInfo';
import { GET_FILM } from '../../query/films';
import { GET_PERSON } from '../../query/people';
import { GET_PLANET } from '../../query/planets';
import { GET_SPECIE } from '../../query/species';
import { GET_STARSHIP } from '../../query/starships';
import { GET_VEHICLE } from '../../query/vehicles';
 
import classes from './FullItem.module.sass'

interface IProps {
    id?: string,
    type?: string,
    hide?: () => void,
}

const FullItem: React.FC<IProps> = ({id, type, hide}) => {

    const [info, setInfo] = React.useState<any>(null);
    const [link, setLink] = React.useState(GET_FILM);

    const [checked, setChecked] = React.useState(false);

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
        variables: {id},
        skip: !checked
    })

    React.useEffect( () => {
        setInfo(post(data, classes))
        if (loading) setInfo(<p>loading</p>)
    }, [link, type, data, loading] )


    return (
        <React.Fragment>
            <div className={classes.FullItemDiv}>
                <p className={classes.Back} onClick={hide}>back</p>
                {info}
            </div>
        </React.Fragment>
    )
}

export default FullItem
