import React,  {useState } from 'react'
import { Button, Header, Modal } from 'semantic-ui-react'
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
            <Modal.Header>Add New Route</Modal.Header>
            <Modal.Content>
                <Modal.Description>
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