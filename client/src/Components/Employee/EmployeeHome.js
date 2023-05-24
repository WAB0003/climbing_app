import React , {useState, useEffect}  from 'react';
import 'semantic-ui-css/semantic.min.css'
import { Table, Container, Icon, Form } from 'semantic-ui-react'
import "../../App.css"
import AddRouteModal from './AddRouteModal';
import { useRecoilState, useRecoilValue } from 'recoil';
import { currentRoutes } from '../../Recoil/routesRecoil';
import UpdateRouteModal from './UpdateRouteModal';
import { currentGyms } from '../../Recoil/gymsRecoil';



const EmployeeHome = () => {
    const [allRoutes, setAllRoutes] = useRecoilState(currentRoutes)
    const allGyms = useRecoilValue( currentGyms )
    const [filterGym, setFilterGym] = useState("All")

    let filteredRoutes = allRoutes
    if (filterGym === "All"){
        filteredRoutes = allRoutes
    } else {
        filteredRoutes = allRoutes.filter((route)=>route.gym.name === filterGym)
        // console.log(filteredRoutes)
    }
    
    //! Handle Delete of route
    const handleDeleteClick=(route)=>{
        fetch(`/routes/${route.id}`,{
        method: "DELETE",
        })
        // .then(r=>r.json())
        .then(()=>handleDeleteRoute(route))
    }

    const handleDeleteRoute = (deletedRoute) =>{
        const updatedRouteList = allRoutes.filter((route)=>route.id !== deletedRoute.id)
        setAllRoutes(updatedRouteList)
    }

    const handleFilter = (e) => {
        setFilterGym(e.target.value)
    }

    
    


    //Variable to display all routes as a row in the Table:
    const displayRoutes = filteredRoutes.map((route) => {
        return (
            <Table.Row key={route.id}>
                <Table.Cell>{route.id}</Table.Cell>
                <Table.Cell>{route.active?"Active":""}</Table.Cell>
                <Table.Cell>{route.name}</Table.Cell>
                <Table.Cell>V-{route.rating}</Table.Cell>
                <Table.Cell>{route.setter.first_name} {route.setter.last_name}</Table.Cell>
                <Table.Cell>{route.gym.name}</Table.Cell>
                <Table.Cell>{route.likes.length}</Table.Cell>
                <Table.Cell>
                    <div className='table_icons' >
                        <UpdateRouteModal route={route}/>
                        <Icon className='table_icon' name='delete' onClick={()=>handleDeleteClick(route)}/>
                    </div>
                </Table.Cell>
            </Table.Row>
        )
    })
    

    return(
        <div>
            <h1 className='User_Page_Titles' >Employee Home</h1>
            <Container >
                <div className='employee_home_options' >
                    <Form>
                        <Form.Field label="Filter By Gym" control='select' onChange={handleFilter}>
                            <option>All</option>
                            {allGyms.map((each_gym)=><option key={each_gym.id} >{each_gym.name}</option>)}
                        </Form.Field>
                    </Form>
                    {<AddRouteModal />}
                </div>
                <Table celled>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>id</Table.HeaderCell>
                            <Table.HeaderCell>Active</Table.HeaderCell>
                            <Table.HeaderCell>Name</Table.HeaderCell>
                            <Table.HeaderCell>Rating</Table.HeaderCell>
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