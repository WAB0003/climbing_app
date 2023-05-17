import './App.css';
import { Routes, Route } from "react-router-dom"
import { useState } from 'react';
import Navbar from './Components/Navbar';
import UserHome from './Components/User/UserHome';
import EmployeeHome from './Components/Employee/EmployeeHome';
import LoginPage from './Components/LoginPage';

function App() {
  const [user, setUser] = useState(null)

  const updateUser = (user) => setUser(user)




  if (!user) return (
    <div className="App">
      <Navbar />
      <LoginPage updateUser={updateUser} /> 
    </div>
  )

  return (
    <div className="App">
      <Navbar />
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
