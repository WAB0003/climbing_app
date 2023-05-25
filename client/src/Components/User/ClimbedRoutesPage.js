import { useRecoilState, useRecoilValue } from "recoil";
import { currentUser } from "../../Recoil/userRecoil";
import { Table, Container, Icon } from "semantic-ui-react";
import { currentClimbs } from "../../Recoil/climbsRecoil";
import ClimbedRouteRow from "./ClimbedRouteRow";
import { Link } from "react-router-dom";


const ClimbedRoutesPage = () => {

  const [allClimbs, setAllClimbs] = useRecoilState(currentClimbs)
  const user = useRecoilValue(currentUser)
  
  const userClimbs = allClimbs?.filter((climb)=>(climb.user.id=== user.id))
  const displayClimbs = userClimbs.map((climb) => <ClimbedRouteRow key={climb.id} climb= {climb} />)

  
  if (userClimbs.length ===0){
    return (
        <>
            <h2 className="User_Page_Titles" >You have Climbed No Routes!</h2>
            <h3 style={{textAlign:"center"}} >Visit the {<Link to="/routes" >Current Routes</Link>} page and click the " {<Icon name='check'/>}" for each Route you have climbed!</h3>
        </>
    )
  }else{

    return(
        <div>
            <h1 className="User_Page_Titles" >Climbed Routes</h1>
            <Container >
                <Table celled>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>Route Name</Table.HeaderCell>
                            <Table.HeaderCell>Rating</Table.HeaderCell>
                            <Table.HeaderCell>Setter</Table.HeaderCell>
                            <Table.HeaderCell>Gym</Table.HeaderCell>
                            <Table.HeaderCell>Date Climbed</Table.HeaderCell>
                            <Table.HeaderCell>Options</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {displayClimbs}
                    </Table.Body>
                </Table>
            </Container>
        </div>
    )
  }
}
  
export default ClimbedRoutesPage;