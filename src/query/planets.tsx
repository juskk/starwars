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

export const GET_PLANET = gql`
    query getItem($id: ID) {
        planet(id: $id) {
            name
            diameter
            rotationPeriod
            orbitalPeriod
            gravity
            population
            climates
            terrains
            surfaceWater
            residentConnection {
                residents {
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
