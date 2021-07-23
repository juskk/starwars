import {gql} from '@apollo/client'

export const GET_ALL_PEOPLE = gql`
    query {
        allPeople {
            people {
                name
                id
            }
        }
    }
`

export const GET_PERSON = gql`
    query getItem($id: ID) {
        person(id: $id) {
            name
            birthYear
            eyeColor
            gender
            hairColor
            height
            mass
            skinColor
            homeworld {
                name
            }
            filmConnection {
                films {
                    title
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
        }
    } 
`

