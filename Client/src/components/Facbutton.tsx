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
                    
                    <Button variant="outline-primary"className='button1'>Import Facilities</Button>
                    <Button variant="outline-primary" className='button2'>export to excel</Button>
                    <Button variant="primary" className='button3'>+ New Building</Button>
                    <Button variant="danger" className='button4'>+new Floor</Button>
                         
                </div>
                </Col>
            </Row>
        </Container>
             
    )
}
export default Facbutton;