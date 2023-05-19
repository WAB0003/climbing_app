import './App.css';
import { useEffect, useState } from 'react';
import LoginPage from './Components/LoginPage';
import UserApp from './Components/User/UserApp';
import EmployeeApp from './Components/Employee/EmployeeApp';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { currentUser } from './Recoil/userRecoil';
import { currentGyms } from './Recoil/gymsRecoil';
import { currentRoutes } from './Recoil/routesRecoil';

function App() {

  const [user, updateUser ] = useRecoilState(currentUser)
  const setAllGyms = useSetRecoilState(currentGyms)
  const setAllRoutes = useSetRecoilState(currentRoutes)

  //Check if user exists in session already
  useEffect(() => {
    fetch("/checksession")
    .then((r)=>{
      if (r.ok) {
        r.json().then((user) => updateUser(user));
      }
    });
  },[])

  //Get all routes upon initial render:
  useEffect(()=>{
    fetch("/routes")
    .then(r=>r.json())
    .then(routes=>setAllRoutes(routes))
  },[])
  //Get all routes upon initial render:
  useEffect(()=>{
      fetch("/gyms")
      .then(r=>r.json())
      .then(gyms=>setAllGyms(gyms))
  },[])


  //create a statement for USER. If User has Admin quality, then direct user toward employee page, otherwise, go to user page
  if (!user) return <LoginPage />
  if (user.admin ===false)return<UserApp /> 
  else if (user.admin === true)return <EmployeeApp />
}
export default App;
