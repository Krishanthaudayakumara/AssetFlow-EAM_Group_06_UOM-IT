import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Workstationform from './Workstationform';
import WorkstationCard from './WorkstationCard';
import "../../css/Facilitycss/Workstation.css";
import { Button, Modal } from 'react-bootstrap'
import Workstation from './Workstationdata';
import Workstationdata from './Workstationdata';
import { useState } from 'react';
import Forms from './Forms';


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

    

    

    return (
        <div>
            <div className="container">
                <div className="row">
                    <div className="col-9" style={{padding:'0 0 10px 500px'}}>
                    <Button type="button" className='add-worstation-btn' onClick={handleAddWorkstation} data-toggle='modal'>+Worstation</Button>

                    </div>
                    <div className="col-3">

                    </div>
                </div>

            </div>

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
