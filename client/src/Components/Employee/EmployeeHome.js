import React , {useState, useEffect}  from 'react';
import 'semantic-ui-css/semantic.min.css'
import { Table, Container, Icon } from 'semantic-ui-react'
import "../../App.css"
import AddRouteModal from './AddRouteModal';


const EmployeeHome = ({user}) => {
    const [allRoutes, setAllRoutes] = useState([])
    const [allGyms, setAllGyms] = useState([])
    
    //Get all routes upon initial render:
    useEffect(()=>{
        fetch("/routes")
        .then(r=>r.json())
        .then(routes=>setAllRoutes(routes))
    },[])
    //Get all routes upon initial render:
    useEffect(()=>{
        fetch("/gyms")
        .then(r=>r.json())
        .then(gyms=>setAllGyms(gyms))
    },[])


    const handleAddRoute = (newRoute) => {
        setAllRoutes((prevRouteList)=>[...prevRouteList,newRoute])

    }


    const handleEditClick=(route)=>{
        console.log("clicked")
    }

    //! Handle Delete of route
    const handleDeleteClick=(route)=>{
        console.log(route.id)
        fetch(`/routes/${route.id}`,{
        method: "DELETE",
        })
        .then(r=>r.json)
        .then(()=>handleDeleteRoute(route))
    }

    const handleDeleteRoute = (deletedRoute) =>{
        // console.log(deletedRoute)
        const updatedRouteList = allRoutes.filter((route)=>route.id !== deletedRoute.id)
        setAllRoutes(updatedRouteList)
    }


    //Variable to display all routes as a row in the Table:
    const displayRoutes = allRoutes.map((route) => {
        return (
            <Table.Row key={route.id}>
                <Table.Cell>{route.id}</Table.Cell>
                <Table.Cell>{route.active?"Active":""}</Table.Cell>
                <Table.Cell>{route.name}</Table.Cell>
                <Table.Cell>V-{route.rating}</Table.Cell>
                <Table.Cell>{route.video_url}</Table.Cell>
                <Table.Cell>{route.setter.first_name} {route.setter.last_name}</Table.Cell>
                <Table.Cell>{route.gym.name}</Table.Cell>
                <Table.Cell>{route.likes.length}</Table.Cell>
                <Table.Cell>
                    <div className='table_icons' >
                        <Icon className='table_icons' name='edit' onClick={()=>handleEditClick(route)} />
                        <Icon className='table_icons' name='delete' onClick={()=>handleDeleteClick(route)}/>
                    </div>
                    {/* <Button onClick={()=>deleteTeam(route)}>Delete Route</Button> */}
                </Table.Cell>
            </Table.Row>
        )
    })
    

    return(
        <div>
            <h1>Employee Home</h1>
            <Container >
                {<AddRouteModal user={user} handleAddRoute={handleAddRoute} allGyms={allGyms} />}
                <Table celled>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>id</Table.HeaderCell>
                            <Table.HeaderCell>Active</Table.HeaderCell>
                            <Table.HeaderCell>Name</Table.HeaderCell>
                            <Table.HeaderCell>Rating</Table.HeaderCell>
                            <Table.HeaderCell>Video</Table.HeaderCell>
                            <Table.HeaderCell>Setter</Table.HeaderCell>
                            <Table.HeaderCell>Gym</Table.HeaderCell>
                            <Table.HeaderCell>Likes</Table.HeaderCell>
                            <Table.HeaderCell>Options</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {displayRoutes}
                    </Table.Body>
                </Table>
            </Container>
        </div>
    )
}

export default EmployeeHome