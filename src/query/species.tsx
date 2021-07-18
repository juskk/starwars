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

export const GET_SPECIE = gql`
    query getItem($id: ID) {
        species(id: $id) {
            name
            classification
            designation
            averageHeight
            averageLifespan
            eyeColors
            hairColors
            skinColors
            language
            homeworld {
                name
            }
            personConnection {
                people {
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

export const postSpecie = (data: any, classes: any) => {
    let info: any;
    if (data) {
        let item = data.species;
        info = (
            <div className={classes.InfoDiv}>
                <p> <span className={classes.Title}>Species name:</span> {item.name ? item.name : 'none'}; </p>
                <p> <span className={classes.Title}>Classification:</span> {item.classification}; </p> 
                <p> <span className={classes.Title}>Designation:</span> {item.designation}; </p>
                <p> <span className={classes.Title}>Average height:</span> {item.averageHeight}; </p>
                <p> <span className={classes.Title}>Average lifespan:</span> {item.averageLifespan ? item.averageLifespan : 'none'}; </p>
                <p> <span className={classes.Title}>Eye colors:</span> {item.eyeColors.map( (item: any) => item + '; '  )} </p>
                <p> <span className={classes.Title}>Hair colors:</span> {item.hairColors.map( (item: any) => item + '; '  )} </p>
                <p> <span className={classes.Title}>Skin colors:</span> {item.skinColors.map( (item: any) => item + '; '  )} </p>
                <p> <span className={classes.Title}>Language:</span> {item.language}; </p>
                <p> <span className={classes.Title}>Homeworld:</span> {item.homeworld.name}; </p>
            </div>
        )
    }
    return info
}