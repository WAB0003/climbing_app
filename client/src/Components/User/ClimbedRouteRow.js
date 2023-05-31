import { Table } from "semantic-ui-react";
import UploadWidget from "./UploadWidget";
import UserVideoModal from "./UserVideoModal";

const ClimbedRouteRow = ({climb}) => {

    return(
        <Table.Row key={climb.id}>
            <Table.Cell>{climb.route.name}</Table.Cell>
            <Table.Cell>V-{climb.route.rating}</Table.Cell>
            <Table.Cell>{climb.route.setter.first_name} {climb.route.setter.last_name}</Table.Cell>
            <Table.Cell>{climb.route.gym.name}</Table.Cell>
            <Table.Cell>{climb.created_at}</Table.Cell>
            <Table.Cell className='table_icons' >
                <UploadWidget climb={climb} />
                {climb.user_video ? <UserVideoModal climb={climb} /> : ""}
            </Table.Cell>
        </Table.Row>
    )
}

export default ClimbedRouteRow;