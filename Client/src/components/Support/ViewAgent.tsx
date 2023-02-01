import {useEffect, useState} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen } from '@fortawesome/free-solid-svg-icons/faPen';
import { Button, Modal } from 'react-bootstrap';

const ViewAgent = () => {
    const [show, setShow] = useState(false);
    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);
    
    return(
        <div>
           <FontAwesomeIcon onClick={handleShow} icon={faPen}  style={{color:'#482890'}}/>
              <Modal show={show} onHide={handleClose}>
            <Modal.Header>
                <Modal.Title>
                    Agent Details
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                
            </Modal.Body>
            <Modal.Footer>
                <Button variant='secondary' onClick={handleClose}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
        </div>
    )
}
export default ViewAgent