// import { useNavigate } from "react-router-dom"
import { currentUser } from "../../Recoil/userRecoil"
import { useRecoilState } from "recoil"


export default function NavEmployee() {
    // const user = useRecoilValue(currentUser)
    // const updateUser = useSetRecoilState(currentUser)
    const [ user, updateUser ] = useRecoilState(currentUser)

    const handleLogout = () => {
        fetch('/logout', { method: 'DELETE'})
          .then(res => {
            if (res.ok) {
              updateUser(null)
            }
          })
     }


    return (
        <nav className="navbar">
            <div className="nav-menu">
                <ul>
                    <li>
                        <div>Hello, {user.first_name} </div>
                        <a onClick={handleLogout}>Logout</a>
                    </li>
                </ul>
            </div>
         </nav>
    )
}