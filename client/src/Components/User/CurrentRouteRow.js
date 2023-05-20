import { useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { Table, Icon } from "semantic-ui-react";
import { currentUser } from "../../Recoil/userRecoil";
import { currentLikes} from "../../Recoil/likesRecoil";

const CurrentRouteRow = ({route}) => {
    const user = useRecoilValue (currentUser)
    const [allLikes, setAllLikes] = useRecoilState(currentLikes)

    // const [isLiked, setIsliked] = useState(false)

    //get individuallike for the specific route and user:
    const likeArray = allLikes.filter((like)=>{
        if (like.user_id === user.id && like.route_id === route.id) {
            return like
        }
    })
    //above filter gives a list of "1" like. Needs to get the actual object of like if it exists. 
    const specificLike = likeArray[0]
    console.log(specificLike)

    //Variable to display all ACTIVE routes for the SELECTED Gym:
    const handleLikeButton = () => {
        if (specificLike) {
            fetch(`likes/${specificLike.id}`, {
                method: "DELETE", 
            })
            // .then(r=>r.json())
            .then(handleDeleteLike(specificLike))
        }
        else console.log("Patch Request")
    }

    const handleDeleteLike = (deletedLike) =>{
        const updatedLikes = allLikes.filter((like)=>like.id !== deletedLike.id)
        setAllLikes(updatedLikes)
    }



    return(
        <Table.Row key={route.id}>
            <Table.Cell>{route.name}</Table.Cell>
            <Table.Cell>V-{route.rating}</Table.Cell>
            <Table.Cell>{route.video_url}</Table.Cell>
            <Table.Cell>{route.setter.first_name} {route.setter.last_name}</Table.Cell>
            <Table.Cell>{route.likes.length}</Table.Cell>
            <Table.Cell>
                <div className='table_icons' >
                    <Icon className='table_icons'  color={(specificLike) ? "green" : "grey"} name='heart' onClick={handleLikeButton}/>
                </div>
            </Table.Cell>
        </Table.Row>
    )
}

export default CurrentRouteRow;