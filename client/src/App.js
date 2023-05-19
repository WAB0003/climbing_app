import './App.css';
import { useEffect, useState } from 'react';
import LoginPage from './Components/LoginPage';
import UserApp from './Components/User/UserApp';
import EmployeeApp from './Components/Employee/EmployeeApp';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { currentUser } from './Recoil/userRecoil';

function App() {

  const [user, updateUser ] = useRecoilState(currentUser)

  useEffect(() => {
    fetch("/checksession")
    .then((r)=>{
      if (r.ok) {
        r.json().then((user) => updateUser(user));
      }
    });
  },[])


  //create a statement for USER. If User has Admin quality, then direct user toward employee page, otherwise, go to user page
  if (!user) return <LoginPage />
  if (user.admin ===false)return<UserApp /> 
  else if (user.admin === true)return <EmployeeApp />
}
export default App;
