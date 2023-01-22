import React , { Fragment, useState } from 'react';
import {Button, Modal, Table} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Agents from './Agents';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen } from '@fortawesome/free-solid-svg-icons/faPen';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import AddAgent from './AddAgent';
import AgentStatus from './AgentStatus';

function AgentTable(){
    const [show, setShow] = useState(false);
    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);
    return(
     <div>
     <div>
      
     <button onClick={handleShow} type="button" className="btn btn-primary" style={{margin:"20px 0 0 800px"}}>+ Add New Agent</button>
    </div>   
    
    <p style={{margin:"10px 0 30px 70px",color:'#482890',fontSize: '25px'}}>Avaliable Agents</p>  
    <div className="shadow p-3 bg-white rounded" style={{margin:"30px 0 0 65px"}}> 
       <Fragment>
            <div>
           
            <Table className="table  w-100 small text-center table-borderless " hover align='center' style={{fontSize: '14px'}}> 
                <thead>
                    <tr style={{color:'#482890'}}>
                        <th >
                            Agent Name
                        </th>
                        <th>
                            Position
                        </th>
                        <th>
                            Department
                        </th>
                        <th>
                            E mail
                        </th>
                        <th>
                            Pending
                        </th>
                        <th>
                            Completed
                        </th>
                        <th>
                            Status
                        </th>
                        <th>
                            Action
                        </th>
                        
                    </tr>
                    
                </thead>
                <tbody>
                    {
                       Agents && Agents.length > 0 
                       ?
                       Agents.map((item) =>{
                        return(
                            <tr>
                                <td>
                                    {item.agent_name}
                                </td>
                                <td>
                                    {item.agent_position}
                                </td>
                                <td>
                                    {item.agent_department}
                                </td>
                                <td>
                                    {item.agent_email}
                                </td>
                                <td>
                                    {item.agent_pending}
                                </td>
                                <td>
                                    {item.agent_completed}
                                </td>
                                <td>
                                <AgentStatus></AgentStatus>
                                </td>
                                <td>
                                <FontAwesomeIcon icon={faPen} style={{color:'#482890'}}/>
                                    &nbsp;
                                    &nbsp;
                                    &nbsp;
                                <FontAwesomeIcon icon={faTrash} style={{color:'#FF615A'}}/>
                                </td>
                               
                            </tr>
                        )
                       })
                       :
                       "No data available"
                    }
                </tbody>
            </Table>

            <Modal show={show} onHide={handleClose}>
            <Modal.Header>
                <Modal.Title>
                    Add Agent
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <AddAgent/>
            </Modal.Body>
            <Modal.Footer>
                <Button variant='secondary' onClick={handleClose}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>

        </div>
        </Fragment>
        </div>
        </div>
        
    )
}

export default AgentTable;

function setShow(arg0: boolean) {
    throw new Error('Function not implemented.');
}
