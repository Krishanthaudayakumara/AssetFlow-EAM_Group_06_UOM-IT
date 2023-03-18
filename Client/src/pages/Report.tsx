import React,{useState} from 'react';
import { Container } from "react-bootstrap";
import ReportFilter from "../components/Report/ReportFilter";
import "../css/Home.css"; 
import ReportButton from '../components/Report/ReportButton';
import AgentReport from '../components/Report/AgentReport';
import TicketReport from '../components/Report/TicketReport';




  
 const Report:  React.FC = () =>{
  return (
    <Container>
    
     

        <div>
          
          <h1 style={{margin:"0px 0 20px 65px"}}>Reports</h1>
          <div className="shadow p-3 mb-4 bg-white rounded"style={{margin:"0 0 0 65px"}} >
          <ReportFilter/>
         
          </div>
          <div style={{margin:"0 0 0 65px",width:"100%"}}><ReportButton/></div>
          
          <div > 
           <AgentReport/>
            </div>
            <div>
              <TicketReport/>
            </div>
            
           
          </div>
       
     
    
  </Container>
  );
};

export default Report;

