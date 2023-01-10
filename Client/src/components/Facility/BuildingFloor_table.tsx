import React from 'react';
import Table from 'react-bootstrap/Table';

const BuildingFloor_table: React.FC = () => {
    return(
        <div>
             <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Building ID</th>
                        <th>Floor No</th>
                        <th>Building name</th>
                                            
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>123A</td>
                        <td>1</td>
                        <td>Sumanadasa building</td>
                                              
                    </tr>
                    <tr>
                        <td>124B</td>
                        <td>3</td>
                        <td>Lotus building</td>
                    </tr>
                    <tr>
                        <td>126C</td>
                        <td>3</td>
                        <td>Neelson building</td>
                    </tr>
                </tbody>
             </Table>

            
        </div>
     
    )
}
export default BuildingFloor_table;

