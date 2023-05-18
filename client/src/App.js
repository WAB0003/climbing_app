import './App.css';
import { useEffect, useState } from 'react';
import LoginPage from './Components/LoginPage';
import UserApp from './Components/User/UserApp';
import EmployeeApp from './Components/Employee/EmployeeApp';

function App() {
  const [user, setUser] = useState(null)
  const updateUser = (user) => setUser(user)

  useEffect(() => {
    fetch("/checksession")
    .then((r)=>{
      if (r.ok) {
        r.json().then((user) => setUser(user));
      }
    });
  },[])



  //create a statement for USER. If User has Admin quality, then direct user toward employee page, otherwise, go to user page
  if (user) {
    if (user.admin ===false)return<UserApp user={user} updateUser={updateUser} /> 
    else if (user.admin === true)return <EmployeeApp user={user} updateUser={updateUser} />
  } 
  return <LoginPage updateUser={updateUser} />
}
export default App;
