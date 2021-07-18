import {gql} from '@apollo/client'

export const GET_ALL_STARSHIPS = gql`
    query {
        allStarships {
            starships {
                name
                id
            }
        }
    }
`

export const GET_STARSHIP = gql`
    query getItem($id: ID) {
        starship(id: $id) {
            name
            model
            starshipClass
            manufacturers
            costInCredits
            length
            crew
            passengers
            maxAtmospheringSpeed
            hyperdriveRating
            MGLT
            cargoCapacity
            consumables
            pilotConnection {
                pilots {
                    name
                    id
                }
            }
            filmConnection {
                films {
                    title
                    id
                }
            }
        } 
    } 
`
