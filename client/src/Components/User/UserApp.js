import { Routes, Route } from "react-router-dom"
import NavUser from "./NavUser";
import UserHome from "./UserHome";


const UserApp = ({user, updateUser}) => {




    return(
        <div>
          <NavUser user={user} updateUser={updateUser} />
          <Routes>
            <Route path="/" element={<UserHome/>}/>
          </Routes>
        </div>
      )
}
export default UserApp;