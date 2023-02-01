import { Fragment} from 'react';
import {Table} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import AssignProduct from './Assignsdata';

{/*import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen } from '@fortawesome/free-solid-svg-icons/faPen';
import { faTrash } from '@fortawesome/free-solid-svg-icons';*/}


function AssignsTable(){
    
    return(
    <div>
     
      
    <p style={{margin:"30px 0 30px 70px",color:'#482890',fontSize: '18px',fontWeight:'bold'}}>Latest Assigns</p>  
    <div className="shadow p-3 bg-white rounded" style={{margin:"30px 0 0 65px"}}> 
       <Fragment>
            <div>
           
            <Table className="table w-100 small table-borderless table-responsiv align-middle align-left" hover style={{fontSize: '14px'}}> 
                <thead className="thead-light">
                    <tr style={{color:'#482890'}}>
                       
                        
                        <th >
                            Product Name
                        </th>
                        <th>
                            Brand
                        </th>
                        <th>
                            Product Category
                        </th>
                        <th>
                            Assignee
                        </th>
                        <th>
                            Assign Date
                        </th>
                        <th>
                            Department/Team
                        </th>
                        
                        
                    </tr>
                    
                </thead>
                <tbody>
                    {
                       AssignProduct && AssignProduct.length > 0 
                       ?
                       AssignProduct.map((Assigns) =>{
                        return(
                            <tr>

                                
                                <td >
                                                               
                                    {Assigns.p_name}
                                </td>
                                <td className="text-secondary">
                                    {Assigns.p_brand}
                                </td >
                                <td className="text-secondary">
                                    {Assigns.category}c
                                </td>
                                <td className="text-secondary">
                                    {Assigns.assignee}
                                </td>
                                <td className="text-secondary">
                               
                                    {Assigns.date}
                                </td>
                                <td className="text-secondary">
                                
                                    {Assigns.department}
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

export default AssignsTable;