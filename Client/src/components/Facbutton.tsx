import React from 'react';
import { Button} from 'react-bootstrap';
import  "../css/Facilitycss/Topbutton.css"; 
import { Container, Row, Col} from "react-bootstrap";



const Facbutton: React.FC = () => {
    return(
        <Container>
            <Row>
                <Col md={3}></Col>
                <Col md={1}>
                <h4 >Facility</h4>
                </Col>
                <Col md={8}>
                <div className='buttn'>
                    
                    <Button  variant="outline-primary"type="button" className='import-btn'>ImportFacilities</Button>
                    <Button variant="outline-primary"className='button2'>export Excel</Button>
                    <Button variant="primary" className='button3'>+NewBuilding</Button>
                    <Button  variant="danger"className='button4'>+NewFloor</Button>
                         
                </div>
                </Col>
            </Row>
        </Container>
             
    )
}
export default Facbutton;