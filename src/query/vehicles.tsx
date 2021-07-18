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

export const GET_VEHICLE = gql`
    query getItem($id: ID) {
        vehicle(id: $id) {
            name
            model
            vehicleClass
            manufacturers
            costInCredits
            length
            crew
            passengers
            maxAtmospheringSpeed
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

