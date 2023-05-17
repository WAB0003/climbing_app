import { Routes, Route } from "react-router-dom"
import NavEmployee from "./NavEmployee";
import EmployeeHome from "./EmployeeHome";



const EmployeeApp = ({user, updateUser}) => {




    return(
        <div>
          <NavEmployee user={user} updateUser={updateUser} />
          <Routes>
            <Route path="/" element={<EmployeeHome/>}/>
          </Routes>
        </div>
      )
}
export default EmployeeApp;