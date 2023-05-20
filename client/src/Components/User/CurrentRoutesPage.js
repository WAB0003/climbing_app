import { useRecoilValue } from "recoil";
import { currentUser } from "../../Recoil/userRecoil";
import { currentRoutes } from "../../Recoil/routesRecoil";
import { Table, Container, Icon } from "semantic-ui-react";
import { useState } from "react";



const CurrentRoutesPage = () => {
    const allRoutes = useRecoilValue( currentRoutes )
    const user = useRecoilValue(currentUser)
    const gym_id = user.current_gym.id
    const likedRoutes = (user.likes).map((like)=>like.route_id)

    //Variable to display all ACTIVE routes for the SELECTED Gym:
    const handleCheckButton = (route) => {
        console.log(route)
    }


  
    
    const ActiveGymRoutes = allRoutes.filter((route)=>(route.gym.id === gym_id) && (route.active))
    
    const displayRoutes = ActiveGymRoutes.map((route) => {
        // console.log(likedRoutes.includes(route.id) ? "green" : "gray")

        return (
            <Table.Row key={route.id}>
                <Table.Cell>{route.name}</Table.Cell>
                <Table.Cell>V-{route.rating}</Table.Cell>
                <Table.Cell>{route.video_url}</Table.Cell>
                <Table.Cell>{route.setter.first_name} {route.setter.last_name}</Table.Cell>
                <Table.Cell>{route.likes.length}</Table.Cell>
                <Table.Cell>
                    <div className='table_icons' >
                        <Icon className='table_icons'  color={likedRoutes.includes(route.id) ? "green" : "grey"} name='checkmark' onClick={()=>handleCheckButton(route)}/>
                    </div>
                </Table.Cell>
            </Table.Row>
        )
    })
    
  


    
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


export default CurrentRoutesPage;