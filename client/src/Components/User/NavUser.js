import "../../App.css"
import { useState } from "react"
import { currentUser } from "../../Recoil/userRecoil"
import { useRecoilValue, useSetRecoilState } from "recoil"
import { Link, useNavigate } from "react-router-dom"



export default function NavUser() {
    const user = useRecoilValue(currentUser)
    const updateUser = useSetRecoilState(currentUser)
    const navigate = useNavigate()
    
    

    const handleLogout = () => {
        fetch('/logout', { method: 'DELETE'})
          .then(res => {
            if (res.ok) {
              updateUser(null)
              navigate("/")
            }
          })
     }

     const handleRedirect = (e) => {
        if (user.current_gym){
            navigate("/routes")
        }else{
            navigate("/gyms")
            alert("In order to view Current Routes, a gym must be selected!\nYou are being directed to gym selection")
        }
     }

    return (
        <nav className="navbar">
            <div className="nav-menu">
                <ul>
                    <li>
                        <h3>Hello, {user.first_name} </h3>
                        <Link className="nav_button_secondary" onClick={handleLogout}>Logout</Link>
                    </li>
                    <li>
                        <Link className="nav_button" to="/climbed_routes">Climbed Routes</Link>
                    </li>
                    <li>
                        <div className="nav_button" onClick={handleRedirect} to="/routes">Current Routes</div>
                    </li>
                    <li>
                        <h3>{user.current_gym ? `Selected Gym: ${user.current_gym.name}` : "No Gym Selected"}</h3>
                        <Link className="nav_button_secondary"  to="/gyms">Select Preferred Gym</Link>
                    </li>
                </ul>
            </div>
         </nav>
    )
}