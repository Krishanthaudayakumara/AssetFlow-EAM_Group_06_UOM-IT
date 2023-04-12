import { useState } from "react";
import React from 'react';
import { Container, Row} from "react-bootstrap";
//import Chatbot from '../../components/Support/Chatbot';
import SupportButton from '../../components/Support/SupportButton';
import IssueTypeTable from '../../components/Support/Table/IssueTypeTable';
const Issues: React.FC = () => {
    return(
        <Container>
        <Row>         
            <div>         
              <SupportButton/>
              <br/>
              <hr style={{margin:'0 0 0 250px',color:'blue'}}/>
              <IssueTypeTable/>          
            </div>      
        </Row>
        
      </Container>      
    );
};
export default Issues;