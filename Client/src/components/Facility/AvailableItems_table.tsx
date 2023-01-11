import React from 'react';
import Table from 'react-bootstrap/Table';

const AvailableItems_table: React.FC = () => {
    return(
        <div style={{margin:"1rem"}}>
            <h4 className='item'>Available items</h4>
            
             <Table striped bordered hover>
                <thead>
                                            
                    <tr>
                        <th> ID</th>
                        <th>Items</th>
                        <th>Category_id</th>
                        <th>categorycount</th>
                        <th>date</th>
                       
                           
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>#123A</td>
                        <td>meeting room</td>
                        <td>2</td>
                        <td>Sumanadasa building</td>
                        <td>mouse</td>
                      
                    

                                              
                    </tr>
                    <tr>
                        <td>#124B</td>
                        <td>board room</td>
                        <td>1</td>
                        <td>Lotus building</td>
                        <td>Key board</td>
                        
                       
                    </tr>
                    <tr>
                        <td>#126C</td>
                        <td>resting room</td>
                        <td>3</td>
                        <td>Neelson building</td>
                        <td>Chair</td>
                      
                      
                    </tr>
                    <tr>
                        <td>#127C</td>
                        <td>meeting room</td>
                        <td>1</td>
                        <td>Sumanadasa building</td>
                        <td>mouse</td>
                       
                       
                    </tr>
                     
                </tbody>
             </Table>

            
        </div>
     
    )
}
export default AvailableItems_table;

