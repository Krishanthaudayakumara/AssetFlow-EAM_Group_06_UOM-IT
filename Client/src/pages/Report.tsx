import React,{useState} from 'react';
import { Container, Row, Col, Nav, Table } from "react-bootstrap";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import ReportFilter from "../components/Report/ReportFilter";
import ITTable from "../components/Report/ITTable";
import "../css/Home.css"; 
import ReportButton from '../components/Report/ReportButton';
import FacilityTable from '../components/Report/FacilityTable';


interface Props {
    onFilter: (department: string, fromDate: Date, toDate: Date) => void;
  }

  /*const BarChart: FC<Props> = (props: any) => {
 
    const [department, setDepartment] = useState('');
    const [fromDate, setFromDate] = useState(new Date());
    const [toDate, setToDate] = useState(new Date());
  
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      onFilter(department, fromDate, toDate);
    };
    export default Report;*/
 
 

 /*   function onFilter(department: string, fromDate: Date, toDate: Date) {
      throw new Error('Function not implemented.');
    }*/
 const Report:  React.FC = () =>{
  return (
    <Container>
    <Row>
      <Col md={3} className="sidebar-col">
        <div>
          <Sidebar />
        </div>
      </Col>
      
      <Col md={9}>
        <div>
          <Navbar />
          <h1 style={{margin:"0px 0 20px 65px"}}>Reports</h1>
          <div className="shadow p-3 mb-5 bg-white rounded"style={{margin:"0 0 0 65px"}} >
          <ReportFilter/>
         
          </div>
          <div style={{margin:"0 0 0 65px",width:"100%"}}><ReportButton/></div>
          
          <div > 
            <ITTable/>
            </div>
            
           
          </div>
       
      </Col>
    </Row>
  </Container>
  );
};

export default Report;

