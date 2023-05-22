import { useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { Table, Icon } from "semantic-ui-react";
import { currentUser } from "../../Recoil/userRecoil";
import { currentLikes} from "../../Recoil/likesRecoil";
import { currentClimbs} from "../../Recoil/climbsRecoil";

const CurrentRouteRow = ({route}) => {
    const user = useRecoilValue (currentUser)
    const [allLikes, setAllLikes] = useRecoilState(currentLikes)
    const [allClimbs, setAllClimbs] = useRecoilState(currentClimbs)

    const allRouteLikes = allLikes.filter((like)=>like.route.id === route.id)


    //get individual Like for the specific route and user:
    const likeArray = allLikes.filter((like)=>{
        // console.log(like)
        if (like.user.id === user.id && like.route.id === route.id) {
            return like
        }
    })
    //above filter gives a list of "1" like. Needs to get the actual object of like if it exists. 
    const specificLike = likeArray[0]
    // console.log(specificLike)

    //get individual Climb for the specific route and user:
    const climbArray = allClimbs.filter((climb)=>{
        if (climb.user.id === user.id && climb.route.id === route.id) {
            return climb
        }
    })
    // above filter gives a list of "1" climb. Needs to get the actual object of like if it exists. 
    const specificClimb = climbArray[0]
    // console.log(specificClimb)

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

    // //!CLIMB (CHECK) BUTTON
    //Variable to display all ACTIVE routes for the SELECTED Gym:
    const handleCheckButton = () => {
        //*DELETE EXISTING Climb
        if (specificClimb) {
            fetch(`climbs/${specificClimb.id}`, {
                method: "DELETE", 
            })
            .then(()=>{
                const updatedClimb = allClimbs.filter((climb)=>climb.id !== specificClimb.id)
                setAllClimbs(updatedClimb)
            })
        }else{
            //*ADD NEW LIKE
            const new_climb = {
                route_id: route.id,
                user_id: user.id,
            }
            fetch(`climbs`, {
                method: "POST",
                headers: {
                    "Content-Type":"application/json",
                },
                body: JSON.stringify(new_climb) 
            }).then(r=>r.json())
            .then((new_climb)=>{
                setAllClimbs((prevClimbs)=>[...prevClimbs,new_climb])
            }) 
        } 
    }

    return(
        <Table.Row key={route.id}>
            <Table.Cell>{route.name}</Table.Cell>
            <Table.Cell>V-{route.rating}</Table.Cell>
            <Table.Cell>{route.video_url}</Table.Cell>
            <Table.Cell>{route.setter.first_name} {route.setter.last_name}</Table.Cell>
            <Table.Cell>{allRouteLikes.length}</Table.Cell>
            <Table.Cell>
                <div className='table_icons' >
                    <Icon className='table_icons'  color={(specificLike) ? "green" : "grey"} name='heart' onClick={handleLikeButton}/>
                    <Icon className='table_icons'  color={(specificClimb) ? "green" : "grey"} name='check' onClick={handleCheckButton}/>
                </div>
            </Table.Cell>
        </Table.Row>
    )
}

export default CurrentRouteRow;