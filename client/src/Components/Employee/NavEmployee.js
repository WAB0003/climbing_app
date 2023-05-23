// import { useNavigate } from "react-router-dom"
import { currentUser } from "../../Recoil/userRecoil"
import { useRecoilState } from "recoil"
import { Link, useNavigate } from "react-router-dom";


export default function NavEmployee() {
    const [ user, updateUser ] = useRecoilState(currentUser)
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


    return (
        <nav className="navbar">
            <div className="nav-menu">
                <ul>
                    <li>
                        <h3>Hello,  {user.first_name} </h3>
                        <Link className="nav_button_secondary" onClick={handleLogout}>Logout</Link>
                    </li>
                </ul>
            </div>
         </nav>
    )
}