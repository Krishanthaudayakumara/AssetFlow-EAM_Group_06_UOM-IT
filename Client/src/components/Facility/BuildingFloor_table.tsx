import React from 'react';
import Table from 'react-bootstrap/Table';
import { Button } from 'react-bootstrap';


const BuildingFloor_table: React.FC = () => {
    return(
        <div style={{margin:"5rem"}}>
        
            <div className='shadow p-3 mb-5 bg-white rounded'>
            <Table  hover>
                <thead>
                                            
                    <tr>
                        <th> ID</th>
                        <th>Space</th>
                        <th>Floor</th>
                        <th>Building name</th>
                        <th>Description</th>
                        <th>Category_Id</th>
                        <th>Status</th>
                                            
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>#123A</td>
                        <td>meeting room</td>
                        <td>2</td>
                        <td>Sumanadasa building</td>
                        <td>mouse</td>
                        <td>1</td>
                        <td><button  >Available</button></td>

                                              
                    </tr>
                    <tr>
                        <td>#124B</td>
                        <td>board room</td>
                        <td>1</td>
                        <td>Lotus building</td>
                        <td>Key board</td>
                        <td>2</td>
                        <td><button >damged</button></td>
                    </tr>
                    <tr>
                        <td>#126C</td>
                        <td>resting room</td>
                        <td>3</td>
                        <td>Neelson building</td>
                        <td>Chair</td>
                        <td>6</td>
                        <td>Available</td>
                    </tr>
                    <tr>
                        <td>#127C</td>
                        <td>meeting room</td>
                        <td>1</td>
                        <td>Sumanadasa building</td>
                        <td>mouse</td>
                        <td>1</td>
                        <td><button>available</button></td>
                    </tr>
                     
                </tbody>
             </Table>
        
           
            </div>

            
        </div>
     
    )
}
export default BuildingFloor_table;

