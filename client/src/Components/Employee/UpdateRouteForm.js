import React from 'react'
import 'semantic-ui-css/semantic.min.css'
import { Button, Form, Radio } from 'semantic-ui-react'
import { useState } from 'react'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'
import { currentUser } from '../../Recoil/userRecoil'
import { currentGyms } from '../../Recoil/gymsRecoil'
import { currentRoutes } from '../../Recoil/routesRecoil'

//!Notes
//! Pass down All Gyms as State

const UpdateRouteForm = ({ route, setOpen }) =>{
    //Pull in required state from Recoil
    const user = useRecoilValue(currentUser)
    const allGyms = useRecoilValue(currentGyms)
    const [allRoutes, setAllRoutes] = useRecoilState(currentRoutes)
    const [isActive, setIsActive] = useState(route.active)

    // Create state to handle form:
    const [formData, setFormData] = useState({
        name: route.name,
        rating:route.rating,
        gym_id: route.gym_id,
        active: isActive
      })

    // Destruction state of FormData:
    const { name, rating, gym_id, active } = formData

    //! Handle form changes
    const handleChange = (e) => {
        setFormData({...formData, 
        [e.target.name]:e.target.value,
        })
    }
    const handleRadioChange=()=>{
        setIsActive(()=>!isActive)
        setFormData({...formData, 
            active:!isActive,
        })
    }

    
    //! Handle Submit
    const handleSubmit = () => {
        //Create new team object that pull information from formData
        const newRouteObj = {
            name: name,
            rating: rating, 
            setter_id: user.id,
            gym_id: gym_id,
            active: active,
          }

        //*Update Route
        fetch (`/routes/${route.id}`, {
            method: "PATCH",
            headers: {
              "Content-Type":"application/json",
            },
            body: JSON.stringify(newRouteObj)
        })
        .then((r)=>r.json())
        .then((updatedRoute)=>{
            // debugger
            const updatedRouteList = allRoutes.map((route)=>{
                if (route.id===updatedRoute.id) {
                    return updatedRoute;
                }else{
                    return route;
                }
            })
            setAllRoutes(()=>updatedRouteList)
        })
          setOpen(false)
    }

    const displayGyms = allGyms.map((gym)=>{
        return <option key={gym.id} value={gym.id} name="gym_id" >{gym.name}</option>
        })

    return(
        <Form>
            <Form.Field>
                <label>Route Name</label>
                <input placeholder={route.name} name="name" value={name} onChange={handleChange}/>
            </Form.Field>
            <Form.Field>
                <label>Rating</label>
                <input placeholder={route.rating} name="rating" value={rating} onChange={handleChange}/>
            </Form.Field>
            <Form.Field label='Select Gym' control='select' name="gym_id"  onClick={handleChange}>

                {displayGyms}
            </Form.Field>
            <Form.Field>
                <label>Active</label>
                <Form.Radio toggle  checked={isActive} onChange={handleRadioChange}/>
            </Form.Field>
            <Button type='submit' onClick={handleSubmit}>Submit</Button>
        </Form>
    )
}

export default UpdateRouteForm