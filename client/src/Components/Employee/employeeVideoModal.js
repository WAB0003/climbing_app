import { Icon, Modal, Button, Form } from "semantic-ui-react";
import { useState } from "react";
import "../../App.css"
import VideoPlayer from "../User/VideoPlayer";

const EmployeeVideoModal = ({climbs, route}) => {
    const [open, setOpen] = useState(false)
    const [climb, setClimb] = useState({})
    

    const handleFilter = (e) => {
        if (e.target.value === "Select User (Refresh)"){
            setClimb({})
        }else {
            const updatedClimb = (climbs.filter(climb=>climb.user.username===e.target.value))[0]
            setClimb(updatedClimb)
        }

    }

    console.log(Object.keys(climb).length !== 0)
    const handleVideo = () => {
            return <VideoPlayer className="employeeVideo" climb={climb} />
        
    }

    return (
        <Modal
            onClose={() => setOpen(false)}
            onOpen={() => setOpen(true)}
            open={open}
            trigger={<Icon className='table_icon' name='video'/>}
        >
            <Modal.Header>User Videos of '{route.name}'</Modal.Header>
            <Modal.Content className="userVideoModalContent" >
                <Form className="employeeVideoForm" >
                    <Form.Field control='select' onChange={handleFilter}>
                        <option>Select User (Refresh)</option>
                        {climbs.map((climb)=><option key={climb.id} >{climb.user.username}</option>)}
                    </Form.Field>
                </Form>
                {Object.keys(climb).length !== 0? handleVideo() : ""}
            </Modal.Content>
            <Modal.Actions>
                <Button color='black' onClick={() => setOpen(false)}>
                Close
                </Button>
            </Modal.Actions>
        </Modal>
    )
  }

  export default EmployeeVideoModal;