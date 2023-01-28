import React , { useState } from 'react';
import {Button,Modal} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import AddAgentModalForm from './AddAgentModalForm';

export default function SupportButton(){
    const [show, setShow] = useState(false);
    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);
    const [hover, setHover] = useState(false);
    const handleMouseEnter = () => {
        setHover(!hover);
      };
    return(
               <div>
            <div className='container'>
        <div className='row'>
          <div className='col-5'>
            <p style={{margin:"0 0 0 60px",color:'#482890',fontSize: '22px',fontWeight:'bold'}}>SUPPORT</p>
          </div>
          <div className='col-3' style={{padding:'0 0 0 100px'}}>
          <button onMouseEnter={handleMouseEnter} type="button" className="btn btn-outline-primary" style={{border:'1px solid #482890',color:'#482890',backgroundColor:''+(hover? '':'')}}>Export to excel</button>
          </div>
          <div className='col-2' style={{padding:'0 0 0 20px'}}>
          <button  type="button" className="btn btn-outline-light" style={{backgroundColor:'#FF615A'}} >+ New Ticket</button>
          </div>
          <div className='col-2' style={{padding:'0 0 0 0'}}>
          <button onClick={handleShow} type="button" className="btn btn-outline-light" style={{backgroundColor:'#482890'}}>+ Add Agent</button>
          </div>
          </div>
      </div>
      <Modal show={show} onHide={handleClose}>
            <Modal.Header>
                <Modal.Title>
                    Add Agent
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <AddAgentModalForm/>
            </Modal.Body>
            <Modal.Footer>
                <Button variant='secondary' onClick={handleClose}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
        </div>
    );
}

function setShow(arg0: boolean) {
    throw new Error('Function not implemented.');
}