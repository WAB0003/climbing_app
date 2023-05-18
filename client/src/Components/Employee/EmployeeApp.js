import { Routes, Route } from "react-router-dom"
import NavEmployee from "./NavEmployee";
import EmployeeHome from "./EmployeeHome";



const EmployeeApp = ({user, updateUser}) => {




    return(
        <div>
          <NavEmployee user={user} updateUser={updateUser} />
          <Routes>
            <Route path="/" element={<EmployeeHome user={user} />}/>
          </Routes>
        </div>
      )
}
export default EmployeeApp;