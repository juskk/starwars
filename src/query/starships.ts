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