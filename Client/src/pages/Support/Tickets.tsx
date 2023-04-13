import React from 'react';
import { Container, Row} from "react-bootstrap";
//import Chatbot from '../../components/Support/Chatbot';
import SupportButton from '../../components/Support/SupportButton';
import TicketTable from '../../components/Support/Table/TicketTable';
const Tickets: React.FC = () => {
    return(
        <Container>
        <Row>         
            <div>         
              <SupportButton/>
              <br/>
              <hr style={{margin:'0 0 0 250px',color:'blue'}}/>
              <TicketTable/>          
            </div>      
        </Row>
       
      </Container>   
    );
};
export default Tickets;