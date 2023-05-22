import React from 'react'
import 'semantic-ui-css/semantic.min.css'
import { Button, Form } from 'semantic-ui-react'
import { useState } from 'react'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { currentUser } from '../../Recoil/userRecoil'
import { currentGyms } from '../../Recoil/gymsRecoil'
import { currentRoutes } from '../../Recoil/routesRecoil'

//!Notes
//! Pass down All Gyms as State

const AddRouteForm = ({ setOpen }) =>{
    //Pull in required state from Recoil
    const user = useRecoilValue(currentUser)
    const allGyms = useRecoilValue(currentGyms)
    const setAllRoutes = useSetRecoilState(currentRoutes)

    // Create state to handle form:
    const [formData, setFormData] = useState({
        name: "",
        rating:"",
        video_url:"",
        gym_id:1
      })

    // Destruction state of FormData:
    const { name, rating, video_url, gym_id } = formData
    //! Handle form changes
    const handleChange = (e) => {
        setFormData({...formData, 
        [e.target.name]:e.target.value,
        })
    }
    
    //! Handle Submit
    const handleSubmit = () => {
        //Create new team object that pull information from formData
        
        const newRouteObj = {
            name: name,
            rating: rating, 
            video_url: video_url, 
            setter_id: user.id,
            gym_id: gym_id,
            active: true,
          }
        
        //add team to database
        fetch("/routes", {
            method: "POST",
            headers: {
              "Content-Type":"application/json",
            },
            body:JSON.stringify(newRouteObj)
          })
          .then((r)=>r.json())
          .then((newRoute)=>{
            setAllRoutes((prevRouteList)=>[...prevRouteList,newRoute])
          } )
          setOpen(false)
    }

    const displayGyms = allGyms.map((gym)=>{
        return <option key={gym.id} value={gym.id} name="gym_id" >{gym.name}</option>
        })

    return(
        <Form>
            <Form.Field>
                <label>Route Name</label>
                <input placeholder='Enter Name of Route Here' name="name" value={name} onChange={handleChange}/>
            </Form.Field>
            <Form.Field>
                <label>Rating</label>
                <input placeholder="Enter Rating (example: Type '3' for V-3)" name="rating" value={rating} onChange={handleChange}/>
            </Form.Field>
            <Form.Field>
                <label>Video URL</label>
                <input placeholder="Enter Video URL" name="video_url" value={video_url} onChange={handleChange}/>
            </Form.Field>
            <Form.Field label='Select Gym' control='select' name="gym_id"  onChange={handleChange}>
                {displayGyms}
            </Form.Field>
            <Button type='submit' onClick={handleSubmit}>Submit</Button>
        </Form>
    )
}

export default AddRouteForm