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

