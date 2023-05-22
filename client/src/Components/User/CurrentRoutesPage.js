import { useRecoilValue } from "recoil";
import { currentUser } from "../../Recoil/userRecoil";
import { currentRoutes } from "../../Recoil/routesRecoil";
import { Table, Container } from "semantic-ui-react";
import CurrentRouteRow from "./CurrentRouteRow";



const CurrentRoutesPage = () => {
    const allRoutes = useRecoilValue( currentRoutes )
    const user = useRecoilValue(currentUser)
    const gym_id = user.current_gym.id
    
    // debugger
    const ActiveGymRoutes = allRoutes.filter((route)=>(route.gym.id === gym_id) && (route.active))
    const displayRoutes = ActiveGymRoutes.map((route) => <CurrentRouteRow key={route.id} route= {route} />)

    // console.log(ActiveGymRoutes)
    
    return(
        <div>
            <h1>Employee Home</h1>
            <Container >
                <Table celled>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>Name</Table.HeaderCell>
                            <Table.HeaderCell>Rating</Table.HeaderCell>
                            <Table.HeaderCell>Video</Table.HeaderCell>
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
    )
}


export default CurrentRoutesPage;