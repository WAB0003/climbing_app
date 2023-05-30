import { useRecoilValue } from "recoil";
import { currentUser } from "../../Recoil/userRecoil";
import { currentRoutes } from "../../Recoil/routesRecoil";
import { Button, Container, Table } from "semantic-ui-react";
import CurrentRouteRow from "./CurrentRouteRow";
import { useNavigate } from "react-router-dom";
import tableSorter from "../tableSorter";
import { useState } from "react";


const CurrentRoutesPage = () => {
    //! All state values defined in this section
    const allRoutes = useRecoilValue( currentRoutes )
    const user = useRecoilValue(currentUser)
    const navigate = useNavigate()
    const [sortby,setSortBy] = useState({
        order: "regular",
        attribute :null
    })

    //! When Table header is clicked, the handle sort function creates an object that gets passed
    //! to the tableSorter function along with the the array of objects to be sorted.
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
    
    //!Resets table to original display
    const handleTableReset = (e) => {
        setSortBy({
            order: "regular",
            attribute :null
        })
    }

    if (user.current_gym){
        const gym_id = user.current_gym.id

        const ActiveGymRoutes = allRoutes.filter((route)=>(route.gym.id === gym_id) && (route.active))
        //! Run routes through tableSorter function to filter sort routes
        const sortedRoutes = tableSorter(ActiveGymRoutes,sortby)
        const displayRoutes = sortedRoutes.map((route) => <CurrentRouteRow key={route.id} route= {route} />)
        
        return(
            <div>
                <h1 className="User_Page_Titles" >Current Routes at {user.current_gym.name}</h1>
                <div className="centerItems">
                    <Button className="centerItems" onClick={handleTableReset} >Reset Table</Button>
                </div>
                <div className="user_table" >
                    <Container className="user_table">
                    <Table celled className="user_table" >
                        <Table.Header>
                            <Table.Row>
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
                                    <option className='tableHeaders'  value="likes" onClick={handleSort}>Total Likes</option>
                                </Table.HeaderCell>
                                <Table.HeaderCell>Options</Table.HeaderCell>
                            </Table.Row>
                        </Table.Header>
                        <Table.Body>
                            {displayRoutes}
                        </Table.Body>
                    </Table>
                    </Container>
                </div>
            </div>
        )
    }else{
        navigate("/gyms")
    }
}


export default CurrentRoutesPage;