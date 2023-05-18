import React,  {useState } from 'react'
import 'semantic-ui-css/semantic.min.css'
import { Button, Header, Modal, Form } from 'semantic-ui-react'
import AddRouteForm from './AddRouteForm'

const AddRouteModal = () => {
    const [open, setOpen] = useState(false)

    return (
        <Modal
            onClose={() => setOpen(false)}
            onOpen={() => setOpen(true)}
            open={open}
            trigger={<Button>Add Route</Button>}
        >
            <Modal.Header>Team Name</Modal.Header>
            <Modal.Content image>
                <Modal.Description>
                    <Header>Add Team Form</Header>
                    <AddRouteForm setOpen={setOpen} />
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
  
  export default AddRouteModal;