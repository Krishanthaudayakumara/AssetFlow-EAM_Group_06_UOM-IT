import React from 'react';
import Table from 'react-bootstrap/Table';

const AssignedItems_table: React.FC = () => {
    return(
        <div style={{margin:"1rem"}}>
            <div className='shadow p-2 mb- bg-white rounded'style={{width:'800px'}}>
                <Table  className="table w-auto small text-center " hover align='center' style={{fontSize:'14px',width:'500px'}}>
                    <thead>
                        <tr  style={{color:'#482890',fontWeight:'bold'}}>
                            <th>Asset_id</th>
                            <th>Item_name</th>
                            <th>Assign to</th>
                            <th colSpan={2}>b_name</th>
                            <th>floor No</th>
                            <th>Category_Id</th>
                            <th>Assign count</th>
                            <th>Status</th>
                            <th>Action</th>
                            
                        </tr>
                    </thead>

                </Table>

            </div>
           

            
        </div>
     
    )
}
export default AssignedItems_table;

