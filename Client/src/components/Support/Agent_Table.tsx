import React , { Fragment } from 'react';
import {Button , Table} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Agents from './Agents';


function Agent_Table(){
    return(
       <Fragment>
        <div style={{margin:"10rem"}}>
            <Table   hover > 
                <thead>
                    <tr>
                        <th>
                            Agent name
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
                                    {item.agent_available}
                                </td>
                                <td>
                                    <Button onClick={() => alert(item.agent_id)}>UPDATE</Button>
                                    &nbsp;
                                    <Button onClick={() => alert(item.agent_id)} variant="danger">DELETE</Button>
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
    )
}

export default Agent_Table;