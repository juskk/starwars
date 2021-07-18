export const getInfo = (element: any) => {
    let gotInfo = [];

    for (let key in element) {
        if (element[key] instanceof Object) {
            let inside1 = element[key];
            for (let el in inside1) {
                if (inside1[el] instanceof Object) {
                    let inside2 = inside1[el];
                    for (let item in inside2) {
                        if (inside2[item] instanceof Object) {
                            let inside3 = inside2[item]
                            let obj = {id: '', name: ''};
                            for (let item3 in inside3) {
                                if (inside3[item3] instanceof Object) {
                                    
                                } else if (item3 !== 'id' && item3 !== '__typename') {
                                    obj.name = inside3[item3]
                                } else if (item3 === 'id') {
                                    obj.id = inside3[item3]
                                }
                                
                            }
                            gotInfo.push({key: key, data: obj})  

                        } else if (item !== '__typename') {gotInfo.push({key: inside1.__typename, data: inside2[item]})}
                    }



                } else if (el !== '__typename') gotInfo.push({key: key, data: inside1[el]})
            } 
        } else if (key !== '__typename') {
            gotInfo.push({key, data: element[key]})
        }
    }

    let filteredInfo = [];

    let film: any = [], person: any = [];
    let character: any = [];
    let planet: any= [];
    let species: any = [];
    let starship: any = [];
    let vehicle: any = [];
    let resident: any = [];
    let pilot: any = [];


    for (let item in gotInfo) {
        if (!gotInfo[item].key.includes('Connection')) {
            filteredInfo.push({key: gotInfo[item].key, data: gotInfo[item].data})
        } else {
            switch (gotInfo[item].key) {
                case 'filmConnection':film.push(gotInfo[item].data); break
                case 'starshipConnection':starship.push(gotInfo[item].data); break
                case 'vehicleConnection':vehicle.push(gotInfo[item].data); break
                case 'residentConnection':resident.push(gotInfo[item].data); break
                case 'speciesConnection':species.push(gotInfo[item].data); break
                case 'characterConnection':character.push(gotInfo[item].data); break
                case 'personConnection':person.push(gotInfo[item].data); break
                case 'planetConnection':planet.push(gotInfo[item].data); break
                case 'pilotConnection':pilot.push(gotInfo[item].data); break
        }
    }
}
    if (film.length > 0) filteredInfo.push({key: 'film connection', data: film})
    if (person.length > 0) filteredInfo.push({key: 'person connection', data: person})
    if (character.length > 0) filteredInfo.push({key: 'character connection', data: character})
    if (planet.length > 0) filteredInfo.push({key: 'planet connection', data: planet})
    if (species.length > 0) filteredInfo.push({key: 'species connection', data: species})
    if (starship.length > 0) filteredInfo.push({key: 'starship connection', data: starship})
    if (vehicle.length > 0) filteredInfo.push({key: 'vehicle connection', data: vehicle})
    if (resident.length > 0) filteredInfo.push({key: 'resident connection', data: resident})
    if (pilot.length > 0) filteredInfo.push({key: 'pilot connection', data: pilot})




    return filteredInfo
}