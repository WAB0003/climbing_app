import { Routes, Route } from "react-router-dom"
import NavUser from "./NavUser";
import UserHome from "./UserHome";
import SelectGymsPage from "./SelectGymsPage";
import CurrentRoutesPage from "./CurrentRoutesPage";
import ClimbedRoutesPage from "./ClimbedRoutesPage";


const UserApp = () => {

    return(
        <div>
          <NavUser />
          <Routes>
            <Route path="/" element={<UserHome/>}/>
            <Route path="/gyms" element={<SelectGymsPage />} />
            <Route path="/routes" element={<CurrentRoutesPage />} />
            <Route path="/climbed_routes" element={<ClimbedRoutesPage />} />
          </Routes>
        </div>
      )
}
export default UserApp;