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