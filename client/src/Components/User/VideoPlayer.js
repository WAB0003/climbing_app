
import { useEffect, useRef } from "react";


function VideoPlayer({climb}) {
    const cloudinaryRef = useRef();
    const videoRef = useRef();

    useEffect(()=>{
        if (cloudinaryRef.current ) return;
        cloudinaryRef.current = window.cloudinary;

        cloudinaryRef.current.videoPlayer(videoRef.current, {
            cloud_name: 'dorqiv7fn', 
    
        })
   

    },[])

    return(
        <div className="user_video" >
            <video controls ref={videoRef} width={500}  data-cld-public-id={climb.user_video} />
        </div>
    )
}

export default VideoPlayer;