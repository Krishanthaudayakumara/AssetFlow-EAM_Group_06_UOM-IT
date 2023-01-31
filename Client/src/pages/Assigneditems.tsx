import React from 'react';
import { Container, Row, Col} from "react-bootstrap";
import BuildingFloor_table from '../components/Facility/BuildingFloor_table';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import Facbutton from "../components/Facbutton";
import  "../css/Facilitycss/Topbutton.css"; 
import AssignedItems_table from '../components/Facility/AssignedItems_table';
import AvailableItems_table from '../components/Facility/AvailableItems_table';




const Assignitems: React.FC = () => {
    return (
            

        <Container>
            <Row>
                <Col md={3} className="sidebar-col">
                    <div>
                        <Sidebar/>
                    </div>
                    
                </Col>
                <Col md={9} className="Navbar">
                    <div>
                        <Navbar/>
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
                </Col>
                                  
                                
            </Row>
        </Container>
           
    );
  };
  
  export default  Assignitems;
  