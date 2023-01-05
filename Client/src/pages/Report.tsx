import React from 'react';
import { Form, Button, Container, Row, Col, Image ,Table } from "react-bootstrap";

import { BsArrowRightCircle } from "react-icons/bs";
import ReportFilter from "../components/Report/ReportFilter";
import ReportTable from "../components/Report/ReportTable";

/*interface Props {
    onFilter: (department: string, fromDate: Date, toDate: Date) => void;
  }
  */
const Report:  React.FC = () =>{
 
    /*const [department, setDepartment] = useState('');
    const [fromDate, setFromDate] = useState(new Date());
    const [toDate, setToDate] = useState(new Date());
  
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      onFilter(department, fromDate, toDate);
    };
 
 
 
 */
  return (
    <div>
        <h1>Report</h1>
       
         <ReportFilter/>
          <ReportTable/>
        
       
        
    
      
    </div>
  );
};

export default Report;

