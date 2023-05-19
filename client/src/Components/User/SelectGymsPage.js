import { useRecoilValue } from "recoil";
import { currentGyms } from "../../Recoil/gymsRecoil";
import GymCard from "./GymCard";



const SelectGymsPage = () => {
    const allGyms = useRecoilValue( currentGyms )
    
    const gymdisplay = allGyms.map((gym)=><GymCard key={gym.id} gym={gym} />)

    return(
        <>
            <h1>Select A Gym</h1>
            {gymdisplay}
        </>

      )
}

export default SelectGymsPage;