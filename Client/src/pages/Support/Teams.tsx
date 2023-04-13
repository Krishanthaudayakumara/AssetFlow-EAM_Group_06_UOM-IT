import React from 'react';
import { Container, Row, Button, Modal} from "react-bootstrap";
import TeamTable from '../../components/Support/Table/TeamTable';
import NewTeamForm from '../../components/Support/Forms/NewTeamForm';

const Teams: React.FC = () => {
  return(
      <Container>
      <Row>         
          <div>               
            <br/>
            <hr style={{margin:'0 0 0 250px',color:'blue'}}/>
            <TeamTable/>         
          </div>      
      </Row>
      
    </Container>      
  );
};
export default Teams;
