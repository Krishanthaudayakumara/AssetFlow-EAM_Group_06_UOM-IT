import React from 'react';
import { Container, Row, Col} from "react-bootstrap";


import Facbutton from "../components/Facbutton";
import  "../css/Facilitycss/Topbutton.css"; 
import AssignedItems_table from '../components/Facility/AssignedItems_table';
import AvailableItems_table from '../components/Facility/AvailableItems_table';




const Assignitems: React.FC = () => {
    return (
            

                        
                    
                    <div>
                        
                        <Facbutton/>
                        <h5 style={{
                            color :"purple",
                            marginLeft:120,
                            paddingTop:40,
                            fontWeight:'bold'
                        }}
                        >Assigned Iems</h5> 
                        <div className=''>               
                        <AssignedItems_table/>
                        </div>  
                        
                       
                    </div>
                                  
                                
           
    );
  };
  
  export default  Assignitems;
  