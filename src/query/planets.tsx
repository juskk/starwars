import {gql} from '@apollo/client'
import { getInfo } from './fetchInfo'

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

export const postPlanet = (data: any, classes: any) => {
    let info: any;
    let gotInfo: any = [];
    if (data) {
        gotInfo = getInfo(data.planet)

        info = (
            <div className={classes.InfoDiv}>
                {gotInfo.map( (item: any, index: number) => {
                    if (item.data instanceof Object) {
                        return (
                        <div key={item.key + index}> 
                            <span className={classes.Title}>{item.key}:</span> 
                            {item.data.map( (item: any) => <p onClick = { () => console.log(item.id) } key={item.id}>{item.name}</p> )}
                        </div>
                        )
                    } else return <p key={item.key + index}><span className={classes.Title}>{item.key}:</span> {item.data}</p>
                } )}
            </div>
        )
    }
    return info
}