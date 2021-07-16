import {gql} from '@apollo/client'

export const GET_ALL_PLANETS = gql`
    query {
        allPlanets {
            planets {
                name
                id
            }
        }
    }
`