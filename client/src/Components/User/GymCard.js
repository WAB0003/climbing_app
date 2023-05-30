import React from 'react'
import { useRecoilState } from 'recoil'
import { Button, Card } from 'semantic-ui-react'
import { currentUser } from '../../Recoil/userRecoil'



const GymCard = ({gym}) => {
    const [ user, updateUser ] = useRecoilState( currentUser )

    //Patch request to update the current_gym_id on the current user
    const updateUserGym = () => {
        fetch (`/users/${user.id}`, {
            method: "PATCH",
            headers: {
              "Content-Type":"application/json",
            },
            body: JSON.stringify({current_gym_id:gym.id})
        })
        .then((r)=>r.json())
        .then((updatedUser)=>{
            updateUser(()=>updatedUser)
            alert(`You selected ${gym.name}`)
        })
    }
        

    return(
            <Card className='gym_card' >
            <Card.Content >
                <Card.Header>{gym.name}</Card.Header>
                <Card.Description>Address:</Card.Description>
                <Card.Meta>{gym.street}</Card.Meta>
                <Card.Meta>{gym.city}, {gym.state} {gym.zipcode}</Card.Meta>
                <Card.Meta></Card.Meta>
                <Card.Description>Phone:</Card.Description>
                <Card.Meta>{gym.phone}</Card.Meta>
            </Card.Content>
            <Card.Content extra>
                <Button fluid basic color='green' onClick={updateUserGym}>Select</Button>
            </Card.Content>
            </Card>
    )
}

export default GymCard;