import { useRecoilState, useRecoilValue } from "recoil";
import { currentUser } from "../../Recoil/userRecoil";
import { Table, Container } from "semantic-ui-react";
import { currentClimbs } from "../../Recoil/climbsRecoil";
import ClimbedRouteRow from "./ClimbedRouteRow";


const ClimbedRoutesPage = () => {

  const [allClimbs, setAllClimbs] = useRecoilState(currentClimbs)
  const user = useRecoilValue(currentUser)
  
  const userClimbs = allClimbs.filter((climb)=>(climb.user.id=== user.id))
  const displayClimbs = userClimbs.map((climb) => <ClimbedRouteRow key={climb.id} climb= {climb} />)

  console.log(userClimbs)
  
  return(
      <div>
          <h1>Climbed Routes</h1>
          <Container >
              <Table celled>
                  <Table.Header>
                      <Table.Row>
                          <Table.HeaderCell>Route Name</Table.HeaderCell>
                          <Table.HeaderCell>Rating</Table.HeaderCell>
                          <Table.HeaderCell>Setter</Table.HeaderCell>
                          <Table.HeaderCell>Gym</Table.HeaderCell>
                          <Table.HeaderCell>Date Climbed</Table.HeaderCell>
                          <Table.HeaderCell>Video</Table.HeaderCell>
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
  
export default ClimbedRoutesPage;