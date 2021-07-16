import {gql} from '@apollo/client'

export const GET_ALL_VEHICLES = gql`
    query {
        allVehicles {
            vehicles {
                name
                id
            }
        }
    }
`