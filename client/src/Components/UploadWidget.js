import { useEffect, useRef } from "react"
import { useRecoilState } from "recoil";
import { Icon, Button } from 'semantic-ui-react'
import { currentClimbs } from "../Recoil/climbsRecoil";

const UploadWidget = ({climb}) => {
    const [allClimbs, setAllClimbs] = useRecoilState(currentClimbs)
    const cloudinaryRef = useRef();
    const widgetRef = useRef();


    const videoToDatabase = (climb, video_url) => {
        const updatedClimb = {
            user_video: video_url 
          }

        fetch (`/climbs/${climb.id}`, {
            method: "PATCH",
            headers: {
              "Content-Type":"application/json",
            },
            body: JSON.stringify(updatedClimb)
        })
        .then((r)=>r.json())
        .then((updatedClimb)=>{
            const updatedClimbList = allClimbs.map((climb)=>{
                if (climb.id===updatedClimb.id) {
                    return updatedClimb;
                }else{
                    return climb;
                }
            })
            setAllClimbs(()=>updatedClimbList)
        })
    }




    useEffect(()=> {
        cloudinaryRef.current = window.cloudinary;
        widgetRef.current = cloudinaryRef.current.createUploadWidget({
            cloudName: "dorqiv7fn",
            uploadPreset: "cpms2iop",
        },function(error, result){
            videoToDatabase(climb, result.info.public_id);
        });
    },[])
    return (
        // <Icon onClick={() => widgetRef.current.open()} className='table_icons' name='video camera'/>
        <Button onClick={() => widgetRef.current.open()} >Prove It!</Button>
    )

}

export default UploadWidget