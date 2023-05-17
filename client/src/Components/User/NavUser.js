import "../../App.css"


export default function NavUser({user, updateUser}) {
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