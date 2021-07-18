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
                }
            }
            filmConnection {
                films {
                    title
                }
            }
        } 
    } 
`

export const postVehicle = (data: any, classes: any) => {
    let info: any;
    if (data) {
        let item = data.vehicle
        console.log(item)
        info = (
            <div className={classes.InfoDiv}>
                <p> <span className={classes.Title}>Vehicles name:</span> {item.name ? item.name : 'none'}; </p>
                <p> <span className={classes.Title}>model:</span> {item.model ? item.model : 'none'}; </p>
                <p> <span className={classes.Title}>vehicleClass:</span> {item.vehicleClass ? item.vehicleClass : 'none'}; </p>
                <p> <span className={classes.Title}>manufacturers:</span> {item.manufacturers.map( (item: any) => item + '; '  )} </p>
                <p> <span className={classes.Title}>costInCredits:</span> {item.costInCredits ? item.costInCredits : 'none'}; </p>
                <p> <span className={classes.Title}>length:</span> {item.length ? item.length : 'none'}; </p>
                <p> <span className={classes.Title}>crew:</span> {item.crew ? item.crew : 'none'}; </p>
                <p> <span className={classes.Title}>passengers:</span> {item.passengers ? item.passengers : 'none'}; </p>
                <p> <span className={classes.Title}>maxAtmospheringSpeed:</span> {item.maxAtmospheringSpeed ? item.maxAtmospheringSpeed : 'none'}; </p>
                <p> <span className={classes.Title}>cargoCapacity:</span> {item.cargoCapacity ? item.cargoCapacity : 'none'}; </p>
                <p> <span className={classes.Title}>consumables:</span> {item.consumables ? item.consumables : 'none'}; </p>
            </div>
        )
    }
    return info
}