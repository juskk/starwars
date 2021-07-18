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

export const GET_STARSHIP = gql`
    query getItem($id: ID) {
        starship(id: $id) {
            name
            model
            starshipClass
            manufacturers
            costInCredits
            length
            crew
            passengers
            maxAtmospheringSpeed
            hyperdriveRating
            MGLT
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

export const postStarship = (data: any, classes: any) => {
    let info: any;
    if (data) {
        let item = data.starship;
        info = (
            <div className={classes.InfoDiv}>
                <p> <span className={classes.Title}>Starships name:</span> {item.name ? item.name : 'none'}; </p>
                <p> <span className={classes.Title}>Manufacturers:</span> {item.manufacturers ? item.manufacturers : 'none'}; </p>
                <p> <span className={classes.Title}>Model:</span> {item.model ? item.model : 'none'}; </p>
                <p> <span className={classes.Title}>Starship class:</span> {item.starshipClass ? item.starshipClass : 'none'}; </p>
                <p> <span className={classes.Title}>CostInCredits:</span> {item.costInCredits ? item.costInCredits : 'none'}; </p>
                <p> <span className={classes.Title}>length:</span> {item.length ? item.length : 'none'}; </p>
                <p> <span className={classes.Title}>crew:</span> {item.crew ? item.crew : 'none'}; </p>
                <p> <span className={classes.Title}>passengers:</span> {item.passengers ? item.passengers : 'none'}; </p>
                <p> <span className={classes.Title}>maxAtmospheringSpeed:</span> {item.maxAtmospheringSpeed ? item.maxAtmospheringSpeed : 'none'}; </p>
                <p> <span className={classes.Title}>hyperdriveRating:</span> {item.hyperdriveRating ? item.hyperdriveRating : 'none'}; </p>
                <p> <span className={classes.Title}>MGLT:</span> {item.MGLT ? item.MGLT : 'none'}; </p>
                <p> <span className={classes.Title}>consumables:</span> {item.consumables ? item.consumables : 'none'}; </p>
            </div>
        )
    }
    return info
}