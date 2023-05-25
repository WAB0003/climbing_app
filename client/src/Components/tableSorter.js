const tableSorter = (filteredRoutes,sortby) => {

    let displayRoutes
    if (sortby.attribute === null){
        displayRoutes = filteredRoutes
    }else{
        if(sortby.attribute === "name"){
            const sortedRoutes = [...filteredRoutes].sort((a, b) => a[sortby.attribute].localeCompare(b[sortby.attribute]))
            if(sortby.order === "regular") {
                displayRoutes = sortedRoutes
            }else{
                displayRoutes = sortedRoutes.reverse()
            }
        }else if (sortby.attribute === "setter"){
            const sortedRoutes = [...filteredRoutes].sort((a, b) => a[sortby.attribute].first_name.localeCompare(b[sortby.attribute].first_name))
            if(sortby.order === "regular") {
                displayRoutes = sortedRoutes
            }else{
                displayRoutes = sortedRoutes.reverse()
            }
            
        }else if (sortby.attribute === "gym"){
            const sortedRoutes = [...filteredRoutes].sort((a, b) => a[sortby.attribute].name.localeCompare(b[sortby.attribute].name))
            if(sortby.order === "regular") {
                displayRoutes = sortedRoutes
            }else{
                displayRoutes = sortedRoutes.reverse()
            }
            
        }else if (sortby.attribute === "likes"){
            const sortedRoutes = [...filteredRoutes].sort((a, b) => {
                return (b[sortby.attribute].length - a[sortby.attribute].length)
            } );

            if(sortby.order === "regular") {
                displayRoutes = sortedRoutes
            } else {
                displayRoutes = sortedRoutes.reverse()
            }
        }else{
            const sortedRoutes = [...filteredRoutes].sort((a, b) => {
                return (b[sortby.attribute] - a[sortby.attribute])
            } );

            if(sortby.order === "regular") {
                displayRoutes = sortedRoutes
            } else {
                displayRoutes = sortedRoutes.reverse()
            }
        }
    }
    return displayRoutes
}
export default tableSorter;