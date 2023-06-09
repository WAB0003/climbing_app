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

    //Date Values for the week
    const today = new Date()
    const sevenDaysAgo = new Date()
    sevenDaysAgo.setDate(today.getDate()-7)
    

    //Get all the Route Id's for routes climbed by the user
    const userClimbedRoutes = allClimbs.filter((climb)=>climb.user.id === user.id)
    const userClimbedRouteIds = userClimbedRoutes.map((climb)=>climb.route.id)
    const highestClimbedRating = Math.max.apply(null,userClimbedRoutes.map((climb)=>climb.route.rating))

    
    //*Get Calculate variables needed for the Average Climbing Rating within the last week.

    const lastWeeksClimbs = userClimbedRoutes.filter((climb)=>{
       const climbDate = new Date(climb.created_at)
       if ((climbDate.getDate() - sevenDaysAgo.getDate())<8){
        return climb
       }
    })

    const lastWeeksClimbRatings = lastWeeksClimbs.map(climb=>climb.route.rating)

    const avgWeeklyClimbRating = (lastWeeksClimbRatings) => {
        const totalRatings = lastWeeksClimbRatings.length
        let sum = 0
        for (let i = 0; i <totalRatings; i++){
            sum += lastWeeksClimbRatings[i]
        }
        return Math.round(sum/totalRatings)
    }

  
    
    //!Gym Statistics: Show the user statistics for each Gym
    const showGymsStats = allGyms.map((gym)=>{
        const ActiveGymRoutes = allRoutes.filter((route)=>(route.gym.id === gym.id) && (route.active))
        const ActiveRoutesClimbed = ActiveGymRoutes.filter((route)=>userClimbedRouteIds.includes(route.id))
        // get percentage of routes climbed
        const gym_completion = Math.trunc(ActiveRoutesClimbed.length/ActiveGymRoutes.length * 100)
        
    
        return (
            <div key={gym.id} >
                <h3>{gym.name} (% {gym_completion} Completion) </h3>
                <div className="stat_names stat_col" >
                    <span>Routes Available</span>
                    <span>Active Routes Climbed</span>
                </div>
                <div className="stat_values stat_col" >
                    <span>{ActiveGymRoutes.length}</span>
                    <span>{ActiveRoutesClimbed.length}</span>
                </div>
            </div>
        )
    })

    //!General Statistics:
    const generalStats = () => {
        if (userClimbedRoutes.length) {
            return (
                <div className="statistics" >
                    <h2>General Stats</h2>
                    <div className="stat_names stat_col" >
                        <span>Total Routes Climbed</span>
                        <span>Highest Rating Climbed</span>
                        <span>Avg Rating Climbed This Week</span>
                    </div>
                    <div className="stat_values stat_col" >
                        <span>{userClimbedRoutes.length}</span>
                        <span>V-{highestClimbedRating}</span>
                        <span>V-{avgWeeklyClimbRating(lastWeeksClimbRatings)}</span>
                    </div>
                </div>
            )
        }
    }
    
    
    //!Main Display of Home Page
    return (
        <div >
            <h1 className="User_Page_Titles" >Home</h1>
            <div className="statistics" >
                <h2>Gym Stats:</h2>
                {showGymsStats}
            </div>
            {generalStats()} 
        </div>
    ) 
}

export default UserHome