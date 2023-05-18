import { Routes, Route } from "react-router-dom"
import NavEmployee from "./NavEmployee";
import EmployeeHome from "./EmployeeHome";



const EmployeeApp = () => {

    return(
        <div>
          <NavEmployee />
          <Routes>
            <Route path="/" element={<EmployeeHome />}/>
          </Routes>
        </div>
      )
}
export default EmployeeApp;