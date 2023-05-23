import { useRecoilValue } from "recoil";
import { currentGyms } from "../../Recoil/gymsRecoil";
import { Card } from "semantic-ui-react";
import GymCard from "./GymCard";



const SelectGymsPage = () => {
    const allGyms = useRecoilValue( currentGyms )
    
    const gymdisplay = allGyms.map((gym)=><GymCard key={gym.id} gym={gym} />)

    return(
        <>
            <h1 className="User_Page_Titles" >Select A Gym</h1>
            <Card.Group className="all_gyms" >
                {gymdisplay}
            </Card.Group>
        </>

      )
}

export default SelectGymsPage;