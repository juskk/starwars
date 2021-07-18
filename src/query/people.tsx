import {gql} from '@apollo/client'
import { getInfo } from './fetchInfo'

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
                }
            }
            starshipConnection {
                starships {
                    name
                }
            }
            vehicleConnection {
                vehicles {
                    name
                }
            }
        }
    } 
`

export const postPerson = (data: any, classes: any) => {
    let info: any;
    let gotInfo: any = [];
    if (data) {
        gotInfo = getInfo(data.person)
    

        info = (
            <div className={classes.InfoDiv}>
                {gotInfo.map( (item: any, index: number) => {
                    if (item.data instanceof Object) {
                        return (
                        <div key={item.key + index}> 
                            <span className={classes.Title}>{item.key}:</span> 
                            {item.data.map( (item: any) => <p key={item}>{item}</p> )}
                        </div>
                        )
                    } else return <p key={item.key + index}><span className={classes.Title}>{item.key}:</span> {item.data}</p>
                } )}
            </div>
        )
    }
    return info
}