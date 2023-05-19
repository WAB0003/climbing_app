import "../../App.css"
import { useState } from "react"
import { currentUser } from "../../Recoil/userRecoil"
import { useRecoilValue, useSetRecoilState } from "recoil"
import { Link, useNavigate } from "react-router-dom"



export default function NavUser() {
    const user = useRecoilValue(currentUser)
    const updateUser = useSetRecoilState(currentUser)
    const navigate = useNavigate()
    
    const[isGym, setIsGym]=useState(user.gym)
    // console.log(isGym)
    

    const handleLogout = () => {
        fetch('/logout', { method: 'DELETE'})
          .then(res => {
            if (res.ok) {
              updateUser(null)
              navigate("/")
            }
          })
     }


    return (
        <nav className="navbar">
            <div className="nav-menu">
                <ul>
                    <li>
                        <div>Hello, {user.first_name} </div>
                        <Link onClick={handleLogout}>Logout</Link>
                    </li>
                    <li>Favorite Routes</li>
                    <li>
                        <Link to="/climbed_routes">Climbed Routes</Link>
                    </li>
                    <li>
                        <Link to="/routes">Current Routes</Link>
                    </li>
                    <li>
                        <div>{isGym ? user.gym.name : "No Gym Selected"}</div>
                        <Link to="/gyms">Select Preferred Gym</Link>
                    </li>
                </ul>
            </div>
         </nav>
    )
}