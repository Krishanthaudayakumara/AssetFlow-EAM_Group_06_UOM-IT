import React from 'react';
import { Container, Row, Col} from "react-bootstrap";
import BuildingFloor_table from '../components/Facility/BuildingFloor_table';
import Navbar from '../components/Navbar';

import Facbutton from "../components/Facbutton";
import  "../css/Facilitycss/Topbutton.css"; 





const BuildingFloor: React.FC = () => {
    return (
            

        <Container>
            <Row>
                <Col md={3} className="sidebar-col">
                    <div>
                        
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
                        >Building & Spaces</h5> 
                        <div className=''>               
                        <BuildingFloor_table/>
                        </div>  
                        
                       
                    </div>
                </Col>
                                  
                                
            </Row>
        </Container>
           
    );
  };
  
  export default  BuildingFloor;
  