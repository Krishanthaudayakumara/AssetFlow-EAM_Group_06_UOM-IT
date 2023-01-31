import React from 'react';
import Facbutton from "../components/Facbutton";
import WorkstationCard from '../components/Facility/WorkstationCard';
import  "../css/Facilitycss/Topbutton.css"; 
import { Container, Row, Col} from "react-bootstrap";
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';

import Work1 from '../components/Work1';


const FacilityDashboard: React.FC = () => {
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
                    
                    <Work1/>
                    
                   
                                   
                </div>
            </Col>
                              
                            
        </Row>
    </Container>
       
        
    );
  };
  
  export default FacilityDashboard;
  