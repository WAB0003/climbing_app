import React,  {useState } from 'react'
import 'semantic-ui-css/semantic.min.css'
import { Button, Header, Modal, Icon } from 'semantic-ui-react'
import AddRouteForm from './AddRouteForm'
import UpdateRouteForm from './UpdateRouteForm'

const UpdateRouteModal = ({route}) => {
    const [open, setOpen] = useState(false)

    return (
        <Modal
            onClose={() => setOpen(false)}
            onOpen={() => setOpen(true)}
            open={open}
            trigger={<Icon className='table_icon' name='edit'/>}
        >
            <Modal.Header>Update Existing Route</Modal.Header>
            <Modal.Content image>
                <Modal.Description>
                    <UpdateRouteForm route={route} setOpen={setOpen} />
                </Modal.Description>
            </Modal.Content>
            <Modal.Actions>
                <Button color='black' onClick={() => setOpen(false)}>
                Close
                </Button>
            </Modal.Actions>
        </Modal>
    )
  }

  export default UpdateRouteModal;