import {gql} from '@apollo/client'

export const GET_ALL_SPECIES = gql`
    query {
        allSpecies {
            species {
                name
                id
            }
        }
    }
`

export const GET_SPECIE = gql`
    query getItem($id: ID) {
        species(id: $id) {
            name
            classification
            designation
            averageHeight
            averageLifespan
            eyeColors
            hairColors
            skinColors
            language
            homeworld {
                name
                id
            }
            personConnection {
                people {
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

