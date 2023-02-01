import { Fragment} from 'react';
import {Table} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen } from '@fortawesome/free-solid-svg-icons/faPen';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import MyAssignments from './MyAssignments';
import AgentStatus from './AgentStatus';

function MyAssignmentsTable(){
    return(
        <div>
            <div>
     
      
     <p style={{margin:"30px 0 30px 70px",color:'#482890',fontSize: '18px',fontWeight:'bold'}}>Avaliable Agents</p>  
     <div className="shadow p-3 bg-white rounded" style={{margin:"30px 0 0 65px"}}> 
        <Fragment>
             <div>
            
             <Table className="table w-100 small table-borderless table-responsiv align-middle align-left" hover style={{fontSize: '14px'}}> 
                 <thead className="thead-light">
                     <tr style={{color:'#482890'}}>
                        
                         
                         <th >
                             ID
                         </th>
                         <th>
                             User
                         </th>
                         <th>
                             Type
                         </th>
                         <th>
                             Agent
                         </th>
                         <th>
                             Description
                         </th>
                         <th>
                             Assign Status
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
                         MyAssignments &&  MyAssignments.length > 0 
                        ?
                        MyAssignments.map((item) =>{
                         return(
                             <tr>
                                 
                                 
                                 <td >
                                                                
                                     {item.agent_name}
                                 </td>
                                 <td className="text-secondary">
                                     {item.agent_position}
                                 </td >
                                 <td className="text-secondary">
                                     {item.agent_department}
                                 </td>
                                 <td className="text-secondary">
                                     {item.agent_email}
                                 </td>
                                 <td className="text-secondary">
                                 &nbsp;&nbsp;&nbsp;&nbsp;
                                     {item.agent_pending}
                                 </td>
                                 <td className="text-secondary">
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
        </div>
    )
}
export default MyAssignmentsTable;