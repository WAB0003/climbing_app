import { useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { Table } from "semantic-ui-react";
import { currentUser } from "../../Recoil/userRecoil";
import { currentLikes} from "../../Recoil/likesRecoil";
import { currentClimbs} from "../../Recoil/climbsRecoil";
import UploadWidget from "../UploadWidget";
import UserVideoModal from "./UserVideoModal";

const ClimbedRouteRow = ({climb}) => {
    const user = useRecoilValue (currentUser)
    const [allClimbs, setAllClimbs] = useRecoilState(currentClimbs)


    return(
        <Table.Row key={climb.id}>
            <Table.Cell>{climb.route.name}</Table.Cell>
            <Table.Cell>V-{climb.route.rating}</Table.Cell>
            <Table.Cell>{climb.route.setter.first_name} {climb.route.setter.last_name}</Table.Cell>
            <Table.Cell>{climb.route.gym.name}</Table.Cell>
            <Table.Cell>{climb.created_at}</Table.Cell>
            <Table.Cell>
                {climb.user_video ? <UserVideoModal climb={climb} /> : "No video"}
            </Table.Cell>
            <Table.Cell>
                <UploadWidget climb={climb} />
            </Table.Cell>
        </Table.Row>
    )
}

export default ClimbedRouteRow;