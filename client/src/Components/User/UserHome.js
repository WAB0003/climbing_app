import { useRecoilValue } from "recoil"
import { currentGyms } from "../../Recoil/gymsRecoil"
import { currentUser } from "../../Recoil/userRecoil"
import { currentRoutes } from "../../Recoil/routesRecoil"
import { currentClimbs } from "../../Recoil/climbsRecoil"



const UserHome = () => {
    const user = useRecoilValue(currentUser)
    const allGyms = useRecoilValue(currentGyms)
    const allRoutes = useRecoilValue(currentRoutes)
    const allClimbs = useRecoilValue(currentClimbs)

    const climbedRouteIds = allClimbs.map(climb=>climb.route.id)
    console.log(climbedRouteIds)

    const showGyms = allGyms.map((gym)=>{
        const ActiveGymRoutes = allRoutes.filter((route)=>(route.gym.id === gym.id) && (route.active))
        const ActiveRoutesClimbed = ActiveGymRoutes.filter((route)=>climbedRouteIds.includes(route.id))
        const gym_completion = Math.trunc(ActiveRoutesClimbed.length/ActiveGymRoutes.length * 100)
        

        return (
            <div key={gym.id}>
                <h3>{gym.name} (% {gym_completion} Completion) </h3>
                <div>Routes Available...............................................{ActiveGymRoutes.length}</div>
                <div>Active Routes Climbed...................................{ActiveRoutesClimbed.length}</div>
            </div>
        )
    })

    

    return (
        <div>
            <h1 className="User_Page_Titles" >User Home Page</h1>
            {showGyms}
            


        </div>


    ) 

}

export default UserHome