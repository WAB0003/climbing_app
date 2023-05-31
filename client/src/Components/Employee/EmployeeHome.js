import "../../App.css"
import React , { useState }  from 'react';
import { Table, Container, Icon, Form, Button } from 'semantic-ui-react'
import { useRecoilState, useRecoilValue } from 'recoil';
import UpdateRouteModal from './UpdateRouteModal';
import tableSorter from '../tableSorter';
import AddRouteModal from './AddRouteModal';
import { currentRoutes } from '../../Recoil/routesRecoil';
import { currentGyms } from '../../Recoil/gymsRecoil';
import { currentClimbs } from '../../Recoil/climbsRecoil';
import EmployeeVideoModal from "./employeeVideoModal";



const EmployeeHome = () => {
    const [allRoutes, setAllRoutes] = useRecoilState(currentRoutes)
    const allGyms = useRecoilValue( currentGyms )
    const allClimbs = useRecoilValue( currentClimbs)
    const [filterGym, setFilterGym] = useState("All")
    const [sortby,setSortBy] = useState({
                                            order: "regular",
                                            attribute :null
                                        })

    //! handle Filter of Gyms
    let filteredRoutes = allRoutes
    if (filterGym === "All"){
        filteredRoutes = allRoutes
    } else {
        filteredRoutes = allRoutes.filter((route)=>route.gym.name === filterGym)
    }
    
    //!Created table sorter function that handles specific attributes from tables and sorts accordingly
    const displayRoutes = tableSorter(filteredRoutes, sortby)
    

    //!Handle Functions
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

    const handleSort = (e) => {
        if (sortby.attribute === e.target.value && sortby.order ==="regular"){
            setSortBy({
                order: "reverse",
                attribute: e.target.value})
        }else{
            setSortBy({
                order: "regular",
                attribute: e.target.value})
        }
    }

    const handleTableReset = (e) => {
        setFilterGym("All")
        setSortBy({
            order: "regular",
            attribute :null
        })
    }


    //Variable to display all routes as a row in the Table:
    const eachRoute = displayRoutes.map((route) => {
        const climberVideosOfRoutes = allClimbs.filter(climb=>{
            if (climb.user_video && climb.route.id === route.id){
                return climb
            }
        })

        
        
        return (
            <Table.Row key={route.id}>
                <Table.Cell>{route.id}</Table.Cell>
                <Table.Cell>{route.active?"Active":""}</Table.Cell>
                <Table.Cell>{route.name}</Table.Cell>
                <Table.Cell>V-{route.rating}</Table.Cell>
                <Table.Cell>{route.setter.first_name} {route.setter.last_name}</Table.Cell>
                <Table.Cell>{route.gym.name}</Table.Cell>
                <Table.Cell>{route.likes.length}</Table.Cell>
                <Table.Cell className="center_in_cell" >
                        {climberVideosOfRoutes.length>0?<EmployeeVideoModal climbs={climberVideosOfRoutes} route={route}/>:""}
                </Table.Cell>
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
            <Container className='route_table'  >
                <div className='employee_home_options' >
                    <div>
                        <div style={{fontWeight:"bold"}} >Filter Options:</div>
                        <div className='table_filter'>
                            <Form className='filter_options' >
                                <Form.Field control='select' onChange={handleFilter}>
                                    <option>All</option>
                                    {allGyms.map((each_gym)=><option key={each_gym.id} >{each_gym.name}</option>)}
                                </Form.Field>
                            </Form>
                            <Button className='filter_options' onClick={handleTableReset} >Reset Table</Button>
                        </div>
                    </div>

                    {<AddRouteModal />}
                </div >
                <Table celled >
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>
                                <option className='tableHeaders' value="id" onClick={handleSort}>ID</option>
                            </Table.HeaderCell>
                            <Table.HeaderCell>
                                <option className='tableHeaders'  value="active" onClick={handleSort}>Active</option>
                            </Table.HeaderCell>
                            <Table.HeaderCell>
                                <option className='tableHeaders'  value="name" onClick={handleSort} >Name</option>
                            </Table.HeaderCell>
                            <Table.HeaderCell>
                                <option className='tableHeaders'  value="rating" onClick={handleSort}>Rating</option>
                            </Table.HeaderCell>
                            <Table.HeaderCell>
                                <option className='tableHeaders'  value="setter" onClick={handleSort}>Setter</option>
                            </Table.HeaderCell>
                            <Table.HeaderCell>
                                <option className='tableHeaders'  value="gym" onClick={handleSort}>Gym</option>
                            </Table.HeaderCell>
                            <Table.HeaderCell>
                                <option className='tableHeaders'  value="likes" onClick={handleSort}>Likes</option>
                            </Table.HeaderCell>
                            <Table.HeaderCell>User Videos</Table.HeaderCell>
                            <Table.HeaderCell>Options</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {eachRoute}
                    </Table.Body>
                </Table>
            </Container>
        </div>
    )
}

export default EmployeeHome