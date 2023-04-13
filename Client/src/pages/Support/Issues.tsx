import React from 'react';
import { Container, Row, Button, Modal} from "react-bootstrap";
import IssueTypeTable from '../../components/Support/Table/IssueTypeTable';
import NewIssurTypeForm from '../../components/Support/Forms/NewIssueTypeForm';

const Issues: React.FC = () => {
    return(
        <Container>
        <Row>         
            <div>             
              <br/>
              <hr style={{margin:'0 0 0 250px',color:'blue'}}/>
              <IssueTypeTable/>          
            </div>      
        </Row>
        
      </Container>      
    );
};
export default Issues;