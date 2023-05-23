import './App.css';
import { useEffect, useState } from 'react';
import LoginPage from './Components/LoginPage';
import UserApp from './Components/User/UserApp';
import EmployeeApp from './Components/Employee/EmployeeApp';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { currentGyms } from './Recoil/gymsRecoil';
import { currentRoutes } from './Recoil/routesRecoil';
import { currentUser } from './Recoil/userRecoil';
import { currentLikes } from './Recoil/likesRecoil';
import { currentClimbs } from './Recoil/climbsRecoil';


function App() {

  const [user, updateUser ] = useRecoilState(currentUser)
  const setAllGyms = useSetRecoilState(currentGyms)
  const setAllRoutes = useSetRecoilState(currentRoutes)
  const setAllLikes = useSetRecoilState(currentLikes)
  const setAllClimbs = useSetRecoilState(currentClimbs)

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
  
  //Get all gyms upon initial render:
  useEffect(()=>{
      fetch("/gyms")
      .then(r=>r.json())
      .then(gyms=>setAllGyms(gyms))
  },[])

  useEffect(()=>{
    fetch("/likes")
    .then(r=>r.json())
    .then(likes=>setAllLikes(likes))
  },[])

  //Get all routes upon initial render:
  useEffect(()=>{
    fetch("/climbs")
    .then(r=>r.json())
    .then(climbs=>setAllClimbs(climbs))
  },[])


  //create a statement for USER. If User has Admin quality, then direct user toward employee page, otherwise, go to user page
  if (!user) return <LoginPage />
  if (user.admin ===false)return<UserApp /> 
  else if (user.admin === true)return <EmployeeApp />
}
export default App;
