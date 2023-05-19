import { useRecoilValue } from "recoil";
import { currentUser } from "../../Recoil/userRecoil";
import { useNavigate } from "react-router-dom";

const CurrentRoutesPage = () => {
    const user = useRecoilValue(currentUser)
    const navigate = useNavigate()
    
    // const check_gym = () => {
        
    // }


    return(
        <div>
            Current Routes Page
        </div>
        )
}

export default CurrentRoutesPage;