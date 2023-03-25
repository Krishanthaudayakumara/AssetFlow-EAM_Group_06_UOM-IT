import React from 'react';
import { Container, Row} from "react-bootstrap";
import Chatbot from '../../components/Support/Chatbot';
import SupportButton from '../../components/Support/SupportButton';
const Teams: React.FC = () => {
  return(
      <Container>
      <Row>         
          <div>         
            <SupportButton/>
            <br/>
            <hr style={{margin:'0 0 0 250px',color:'blue'}}/>
                      
          </div>      
      </Row>
      <Chatbot/>
    </Container>      
  );
};
export default Teams;
