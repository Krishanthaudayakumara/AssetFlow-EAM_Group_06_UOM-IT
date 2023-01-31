import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Workstationform from './Facility/Workstationform';
import WorkstationCard from './Facility/WorkstationCard';
import "../css/Facilitycss/Workstation.css";
import { Button, Modal } from 'react-bootstrap'
import Workstation from './Facility/Workstationdata';
import Workstationdata from './Facility/Workstationdata';
import { useState } from 'react';
import Forms from './Facility/Forms';
import Assigneditemform from './Facility/Assignitemform';

export default function Work1() {
    const [show, setshow] = useState(false);
    const [modalTitle, setModalTitle] = useState("Add Workstation");
    const [modalBody, setModalBody] = useState(<Workstationform />);

    const handleClose = () => setshow(false);


    const handleAddWorkstation = () => {
        setModalTitle("Add Workstation");
        setModalBody(<Workstationform />);
        setshow(true);
    };

    const handleAssignItem = () => {
        setModalTitle("Assign Item");
        setModalBody(<Assigneditemform />);
        setshow(true);
    };

    

    return (
        <div>
            <Button type="button" className='add-worstation-btn' onClick={handleAddWorkstation} data-toggle='modal'>+Worstation</Button>
            <Button type="button" className='assign-item-btn' onClick={handleAssignItem}>Assign Item</Button>

            <div className="mainContainer">
                <div className="row">
                    {
                        Workstation && Workstation.length > 0
                            ? Workstation.map((w) => {
                                return (
                                    <WorkstationCard workstationno={w.w_name} />
                                );
                            })
                            : "No data available"
                    }
                </div>

                <Modal show={show} onHide={handleClose}>
                    <Modal.Header>
                        <Modal.Title>{modalTitle}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {modalBody}
                    </Modal.Body>
                    <Modal.Footer>
                        <Button className='close-btn' onClick={handleClose}>Close</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        </div>
    );
}
