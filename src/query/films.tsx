import {gql} from '@apollo/client'

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
                }
            }
            starshipConnection {
                starships {
                    name
                }
            }
            vehicleConnection {
                vehicles {
                    name
                }
            }
            characterConnection {
                characters {
                    name
                }
            }
            planetConnection {
                planets {
                    name
                }
            }
        } 
    } 
`

export const postFilm = (data: any, classes: any) => {
    let info: any;
    if (data) {
        info = (
            <div className={classes.InfoDiv}>
                <p> <span className={classes.Title}>Episodes name:</span> {data.film.title}; </p>
                <p> <span className={classes.Title}>Id:</span> {data.film.episodeID};</p>
                <p> <span className={classes.Title}>Director:</span> {data.film.director};</p>
                <p> <span className={classes.Title}>Opening crawl:</span> {data.film.openingCrawl}</p>
                <p> <span className={classes.Title}>Producers:</span> {data.film.producers.map( (item: any) => item + '; '  )}</p>
                <p> <span className={classes.Title}>Release date:</span> {data.film.releaseDate || 'none'};</p>
            </div>
        )
    }
    return info
}