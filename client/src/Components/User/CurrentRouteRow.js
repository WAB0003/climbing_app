import { useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { Table, Icon } from "semantic-ui-react";
import { currentUser } from "../../Recoil/userRecoil";
import { currentLikes} from "../../Recoil/likesRecoil";

const CurrentRouteRow = ({route}) => {
    const user = useRecoilValue (currentUser)
    const [allLikes, setAllLikes] = useRecoilState(currentLikes)

    // const [isLiked, setIsliked] = useState(false)
    const allRotueLikes = allLikes.filter((like)=>like.route_id === route.id)


    //get individuallike for the specific route and user:
    const likeArray = allLikes.filter((like)=>{
        if (like.user_id === user.id && like.route_id === route.id) {
            return like
        }
    })
    //above filter gives a list of "1" like. Needs to get the actual object of like if it exists. 
    const specificLike = likeArray[0]
    console.log(specificLike)

    //!Like (HEART) BUTTON
    //Variable to display all ACTIVE routes for the SELECTED Gym:
    const handleLikeButton = () => {
        //*DELETE EXISTING LIKE
        if (specificLike) {
            fetch(`likes/${specificLike.id}`, {
                method: "DELETE", 
            })
            .then(()=>{
                const updatedLikes = allLikes.filter((like)=>like.id !== specificLike.id)
                setAllLikes(updatedLikes)
            })
        }else{
            //*ADD NEW LIKE
            const new_like = {
                route_id: route.id,
                user_id: user.id,
            }
            fetch(`likes`, {
                method: "POST",
                headers: {
                    "Content-Type":"application/json",
                },
                body: JSON.stringify(new_like) 
            }).then(r=>r.json())
            .then((new_like)=>{
                setAllLikes((prevLikes)=>[...prevLikes,new_like])
            }) 
        } 
    }

    return(
        <Table.Row key={route.id}>
            <Table.Cell>{route.name}</Table.Cell>
            <Table.Cell>V-{route.rating}</Table.Cell>
            <Table.Cell>{route.video_url}</Table.Cell>
            <Table.Cell>{route.setter.first_name} {route.setter.last_name}</Table.Cell>
            <Table.Cell>{allRotueLikes.length}</Table.Cell>
            <Table.Cell>
                <div className='table_icons' >
                    <Icon className='table_icons'  color={(specificLike) ? "green" : "grey"} name='heart' onClick={handleLikeButton}/>
                </div>
            </Table.Cell>
        </Table.Row>
    )
}

export default CurrentRouteRow;