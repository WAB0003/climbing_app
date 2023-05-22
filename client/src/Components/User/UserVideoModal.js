import { Icon, Modal, Button } from "semantic-ui-react";
import { useState } from "react";
import VideoPlayer from "../VideoPlayer";
import "../../App.css"

const UserVideoModal = ({climb}) => {
    const [open, setOpen] = useState(false)

    return (
        <Modal
            onClose={() => setOpen(false)}
            onOpen={() => setOpen(true)}
            open={open}
            trigger={<Icon className='table_icons' color="green" name='video'/>}
        >
            <Modal.Header>Your Climb</Modal.Header>
            <Modal.Content className="user_video" >
                    <VideoPlayer climb={climb} />
            </Modal.Content>
            <Modal.Actions>
                <Button color='black' onClick={() => setOpen(false)}>
                Close
                </Button>
            </Modal.Actions>
        </Modal>
    )
  }

  export default UserVideoModal;