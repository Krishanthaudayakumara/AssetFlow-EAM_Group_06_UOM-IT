import React from 'react';
import { Container, Row, Button, Modal} from "react-bootstrap";
import TicketTable from '../../components/Support/Table/TicketTable';
import NewTicketForm from '../../components/Support/Forms/NewTicketForm';

const Tickets: React.FC = () => {
    return(
        <Container>
        <Row>         
            <div>                    
              <br/>
              <hr style={{margin:'0 0 0 250px',color:'blue'}}/>
              <TicketTable/>          
            </div>      
        </Row>
       
      </Container>   
    );
};
export default Tickets;