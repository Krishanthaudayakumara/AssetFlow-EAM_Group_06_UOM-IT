import React from 'react';
import { Container, Row} from "react-bootstrap";
//import Chatbot from '../../components/Support/Chatbot';
import SupportButton from '../../components/Support/SupportButton';
import TeamTable from '../../components/Support/Table/TeamTable';
const Teams: React.FC = () => {
  return(
      <Container>
      <Row>         
          <div>         
            <SupportButton/>
            <br/>
            <hr style={{margin:'0 0 0 250px',color:'blue'}}/>
            <TeamTable/>         
          </div>      
      </Row>
      
    </Container>      
  );
};
export default Teams;
