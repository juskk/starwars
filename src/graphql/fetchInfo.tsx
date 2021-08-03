export const getInfo = (element: any) => {
    let gotInfo: any[] = [];
    
    console.log(element)

    function fetchInfo(items: any, firstCycle: boolean ) {
        for (let key in items) {

            if (key.includes('Connection') ) {
                fetchInfo(items[key], false)
            }
            else if (!firstCycle) {
                if (items[key] instanceof Object) {
                    if (items[key].length > 0) gotInfo.push({key: key, data: items[key]})
                }
            }
            else {
                gotInfo.push({key: key, data: items[key]})
            }
        }
        
    }

    fetchInfo(element, true)
    if (gotInfo) console.log(gotInfo)
 
    return gotInfo
}



export const post = (data: any, classes: any, load: any) => {
    let info: any;
    let gotInfo: any = [];
    if (data) {
        for (let item in data) {
            gotInfo = getInfo(data[item])
        }
        info = (
            <div className={classes.InfoDiv}>
                {gotInfo.map( (item: any, index: number) => {
                    if (item.data instanceof Object) {
                        let hasObj = false;
                        for (let it in item.data) {
                            if (item.data[it] instanceof Object) hasObj = true
                        }
                        let title = item.key
                        if (hasObj) {
                            return (
                                <div key={item + index}>
                                    <span className={classes.Title}>{title}:</span>
                                    {item.data.map( (el: any, index: number) => {
                                        return (
                                            <p 
                                            className={classes.ClickableText} 
                                            onClick = { () => load(el.id, title, el.name || el.title ) } 
                                            key={el.id + index}>
                                                {el.name || el.title}
                                            </p>
                                        )
                                    } )}
                                </div>
                            )
                        } else if (item.data.id) {
                            return (
                                <p 
                                className={classes.ClickableText} 
                                onClick = { () => load(item.data.id, title, item.data.name || item.data.title ) } 
                                key={item.data.id + index}>
                                    <span className={classes.Title}>{item.key}: </span>
                                    {item.data.name || item.data.title}
                                </p>     
                            )
                        } else return (
                            <p key={item.key + index}><span className={classes.Title}>{item.key}:</span> {item.data}</p>
                        )
                    } else {
                        if (item.data) return <p key={item.key + index}><span className={classes.Title}>{item.key}:</span> {item.data}</p>
                    }
                    return true
                } )}
            </div>
        )
    }
    return info
}