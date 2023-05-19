import React, {useState} from 'react'
// import {useHistory} from 'react-router-dom'
import 'semantic-ui-css/semantic.min.css'
import { Container, Button, Form } from 'semantic-ui-react'
import { Navigate } from 'react-router-dom'
import { currentUser } from '../Recoil/userRecoil'
import { useSetRecoilState } from 'recoil'


const LoginPage = () => {
    //!State Variables
    const [signUp, setSignUp] = useState(false)
    const updateUser = useSetRecoilState(currentUser)
    // const history = useHistory()
    // const [errors, setErrors] = useState(null)
    const [formData, setFormData] = useState({
        first_name: "",
        last_name: "", 
        username: "", 
        password: "",
      })


    //!Form Functions
    const handlClick = () => setSignUp((signUp)=>!signUp)

    const handleChange = (e) => {
        setFormData({...formData, 
            [e.target.name]:e.target.value,
        })
        // console.log(formData)
    }

    const handleSubmit = () => {
        //Create an object to be passed to database
        // console.log("submit button")
        const userObj = {
            first_name: formData.first_name,
            last_name: formData.last_name,
            username: formData.username,
            password: formData.password
        }

        //submit from object to database depending on login or new user
        fetch(signUp ? '/signup' : '/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userObj)
        })
        .then(r=>r.json())
        .then((user)=>{
            // console.log(user)
            updateUser(user)
        })
    }
    

    return (
        <>
        <Container textAlign='left' >
            <Form >
                {signUp&&(
                    <>
                        <Form.Field>
                            <label>First Name</label>
                            <input placeholder='Enter First Name Here' name="first_name" value={formData.first_name} onChange={handleChange}/>
                        </Form.Field>
                        <Form.Field>
                            <label>Last Name</label>
                            <input placeholder='Enter First Name Here' name="last_name" value={formData.last_name} onChange={handleChange}/>
                        </Form.Field>
                    </>
                )}
                <Form.Field>
                    <label>Username</label>
                    <input placeholder='Enter Username Here' name="username" value={formData.username} onChange={handleChange}/>
                </Form.Field>
                <Form.Field>
                    <label>Password</label>
                    <input type='password' placeholder='Enter Password Here' name="password" value={formData.password} onChange={handleChange}/>
                </Form.Field>
                <Button type='submit' onClick={handleSubmit}>Submit</Button>
                <Button onClick={handlClick}>{signUp?"Login" : "Signup"}</Button>
            </Form>
        </Container>
        </>

    )
    

}

export default LoginPage