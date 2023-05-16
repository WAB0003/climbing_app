import './App.css';
import { Routes, Route } from "react-router-dom"
import Navbar from './Components/Navbar';
import UserHome from './Components/User/UserHome';
import EmployeeHome from './Components/Employee/EmployeeHome';
import LoginPage from './Components/LoginPage';

function App() {
  return (
    <div className="App">
      <Navbar />
      <LoginPage /> 
      <UserHome />
      <EmployeeHome />   
      {/* <Routes>
        <Route element={<UserHome />}/>
        <Route element={<EmployeeHome />}/>
      </Routes> */}
      

    </div>
  );
}

export default App;
