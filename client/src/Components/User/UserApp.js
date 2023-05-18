import { Routes, Route } from "react-router-dom"
import NavUser from "./NavUser";
import UserHome from "./UserHome";


const UserApp = () => {




    return(
        <div>
          <NavUser />
          <Routes>
            <Route path="/" element={<UserHome/>}/>
          </Routes>
        </div>
      )
}
export default UserApp;