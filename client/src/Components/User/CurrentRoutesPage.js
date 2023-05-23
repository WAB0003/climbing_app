import { useRecoilValue } from "recoil";
import { currentUser } from "../../Recoil/userRecoil";
import { currentRoutes } from "../../Recoil/routesRecoil";
import { Container, Table } from "semantic-ui-react";
import CurrentRouteRow from "./CurrentRouteRow";
import { useNavigate } from "react-router-dom";



const CurrentRoutesPage = () => {
    const allRoutes = useRecoilValue( currentRoutes )
    const user = useRecoilValue(currentUser)
    const navigate = useNavigate()
    
    if (user.current_gym){
        const gym_id = user.current_gym.id

        const ActiveGymRoutes = allRoutes.filter((route)=>(route.gym.id === gym_id) && (route.active))
        const displayRoutes = ActiveGymRoutes.map((route) => <CurrentRouteRow key={route.id} route= {route} />)
        
        return(
            <div>
                <h1 className="User_Page_Titles" >Current Routes at {user.current_gym.name}</h1>
                <div className="user_table" >
                    <Container className="user_table">
                    <Table celled className="user_table" >
                        <Table.Header>
                            <Table.Row>
                                <Table.HeaderCell>Name</Table.HeaderCell>
                                <Table.HeaderCell>Rating</Table.HeaderCell>
                                <Table.HeaderCell>Setter</Table.HeaderCell>
                                <Table.HeaderCell>Total Likes</Table.HeaderCell>
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