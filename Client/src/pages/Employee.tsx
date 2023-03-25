import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import "../css/Home.css"; // import background image CSS file
import EmployeeTable from "../components/Employee/EmployeeTable";

interface Employee {
  id: number;
  firstName: string;
  lastName: string;
  middleName: string | null;
  email: string;
  phoneNumber: string;
  dateOfBirth: string;
  hireDate: string;
  jobTitle: string | null;
  departmentId: number;
  department: string | null;
  userId: string;
  user: string | null;
}

const Employee: React.FC = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);

  useEffect(() => {
    fetch("http://localhost:5087/api/Employee")
      .then((res) => res.json())
      .then((data) => {
        const employees = data.map((employee: any) => ({
          id: employee.id,
          firstName: employee.firstName,
          lastName: employee.lastName,
          middleName: employee.middleName,
          email: employee.email,
          phoneNumber: employee.phoneNumber,
          dateOfBirth: employee.dateOfBirth,
          hireDate: employee.hireDate,
          jobTitle: employee.jobTitle,
          departmentId: employee.departmentId,
          department: employee.department ? employee.department.name : null,
          userId: employee.userId,
          user: employee.user ? employee.user.userName : null,
        }));
        setEmployees(employees);
      })
      .catch((error) => console.error(error));
  }, []);

  return (
    <Container>
      <Row>
        <Col>
          <EmployeeTable employees={employees} />
        </Col>
      </Row>
    </Container>
  );
};

export default Employee;
