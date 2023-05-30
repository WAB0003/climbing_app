import React, {useState} from 'react'
import { Button, Form } from 'semantic-ui-react'
import { currentUser } from '../Recoil/userRecoil'
import { useSetRecoilState } from 'recoil'
import main_logo from '../images/main_logo.jpg'


const LoginPage = () => {

    //!State Variables
    const [errors, setErrors] = useState(null)
    const [signUp, setSignUp] = useState(false)
    const updateUser = useSetRecoilState(currentUser)

    const [formData, setFormData] = useState({
        first_name: "",
        last_name: "", 
        username: "", 
        password: "",
      })

    
    //!Form Functions
    const handlClick = () => {
        setSignUp((signUp)=>!signUp)
        setErrors(null)
    }

    const handleChange = (e) => {
        setFormData({...formData, 
            [e.target.name]:e.target.value,
        })
    }

    const handleSubmit = () => {
        //Create an object to be passed to database
        setErrors(null)
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
        .then(r => {
            if (r.ok){r.json().then((user)=>{updateUser(user)})}
            else {signUp ? setErrors("Invalid Username") : setErrors("Login does not exist. Please submit a valid Login")}
        })
    }
    

    return (
        <>
        <div className='main_logo'>
            <img className='logo_img' src={main_logo} alt='Main Logo' />
            <div className='logo_position' >
                <div className='logo_title' >BOULDER</div>
                <div className='logo_title' >CLIMB</div>
            </div>
        </div>
        <div className='loginContainer' >
            <Form className='loginForm' >
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
                <div className='Login_btn_container' >
                    <Button type='submit' onClick={handleSubmit}>Submit</Button>
                    <Button onClick={handlClick}>{signUp?"Back to Login" : "Signup"}</Button>
                </div>
                <div style={{paddingTop:"10px", textAlign:'right'  }} >{errors ? errors : "" }</div>
            </Form>
        </div>
        </>

    )
    

}

export default LoginPage