import { Fragment} from 'react';
import {Table} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Agents from './Agents';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen } from '@fortawesome/free-solid-svg-icons/faPen';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import SupportButton from './SupportButton';
import AgentStatus from './AgentStatus';

function AgentTable(){
    
    return(
    <div>
     <SupportButton/>
     <br/>
     <hr style={{margin:'0 0 0 250px',color:'blue'}}/> 
    <p style={{margin:"30px 0 30px 70px",color:'#482890',fontSize: '18px',fontWeight:'bold'}}>Avaliable Agents</p>  
    <div className="shadow p-3 bg-white rounded" style={{margin:"30px 0 0 65px"}}> 
       <Fragment>
            <div>
           
            <Table className="table  w-100 small  table-borderless text-secondary" hover  style={{fontSize: '14px'}}> 
                <thead>
                    <tr style={{color:'#482890'}}>
                        <th></th>
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
                                <td></td>
                                <td  className="text-right">
                                
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
                                &nbsp;&nbsp;&nbsp;&nbsp;
                                    {item.agent_pending}
                                </td>
                                <td>
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
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

            

        </div>
        </Fragment>
        </div>
        </div>
        
    )
}

export default AgentTable;

