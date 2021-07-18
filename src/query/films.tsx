import {gql} from '@apollo/client'
import { getInfo } from './fetchInfo'


export const GET_ALL_FILMS = gql`
    query {
        allFilms {
            films {
                title
                id
            }
        }
    }
`

export const GET_FILM = gql`
    query getItem($id: ID) {
        film(id: $id) {
            title
            episodeID
            openingCrawl
            director
            producers
            releaseDate
            speciesConnection {
                species {
                    name
                    id
                }
            }
            starshipConnection {
                starships {
                    name
                    id
                }
            }
            vehicleConnection {
                vehicles {
                    name
                    id
                }
            }
            characterConnection {
                characters {
                    name
                    id
                }
            }
            planetConnection {
                planets {
                    name
                    id
                }
            }
        } 
    } 
`

export const postFilm = (data: any, classes: any) => {
    let info: any;
    let gotInfo: any = [];
    if (data) {
        gotInfo = getInfo(data.film)

        info = (
            <div className={classes.InfoDiv}>
                {gotInfo.map( (item: any, index: number) => {
                    if (item.data instanceof Object) {
                        return (
                        <div key={item.key + index}> 
                            <span className={classes.Title}>{item.key}:</span> 
                            {item.data.map( (it: any, i: number) => <p key={it.id + i}>{it.name}</p> )}
                        </div>
                        )
                    } else return <p key={item.key + index}><span className={classes.Title}>{item.key}:</span> {item.data}</p>
                } )}
            </div>
        )
    }
    return info
}