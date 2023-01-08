import React , { Fragment } from 'react';
import {Button , Table} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Agents from './Agents';


function Agent_Table(){
    return(
       <Fragment>
        <div style={{margin:"10rem"}}>
            <Table striped bordered hover size="sm">
                <thead>
                    <tr>
                        <th>
                            Name
                        </th>
                        <th>
                            Age
                        </th>
                        <th>
                            Action
                        </th>
                        <th>
                            Name
                        </th>
                        <th>
                            Age
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
                                    {item.name}
                                </td>
                                <td>
                                    {item.age}
                                </td>
                                <td>
                                    <Button onClick={() => alert(item.id)}>UPDATE</Button>
                                    &nbsp;
                                    <Button onClick={() => alert(item.id)}>DELETE</Button>
                                </td>
                                <td>
                                    {item.ame}
                                </td>
                                <td>
                                    {item.ge}
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