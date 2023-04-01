// EmployeeForm.tsx

import React from "react";

interface Employee {
  firstName: string;
  lastName: string;
  middleName: string;
  email: string;
  phoneNumber: string;
  dateOfBirth: string;
  hireDate: string;
  jobTitle: string;
  departmentId: number;
  userName: string;
  password: string;
}

interface Props {
  employee: Partial<Employee>;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const EmployeeForm: React.FC<Props> = ({ employee, onChange }) => {
  return (
    <form>
      <div>
        <label htmlFor="firstName">First Name:</label>
        <input
          type="text"
          id="firstName"
          name="firstName"
          value={employee.firstName || ""}
          onChange={onChange}
        />
      </div>
      <div>
        <label htmlFor="lastName">Last Name:</label>
        <input
          type="text"
          id="lastName"
          name="lastName"
          value={employee.lastName || ""}
          onChange={onChange}
        />
      </div>
      <div>
        <label htmlFor="middleName">Middle Name:</label>
        <input
          type="text"
          id="middleName"
          name="middleName"
          value={employee.middleName || ""}
          onChange={onChange}
        />
      </div>
      <div>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={employee.email || ""}
          onChange={onChange}
        />
      </div>
      <div>
        <label htmlFor="phoneNumber">Phone Number:</label>
        <input
          type="tel"
          id="phoneNumber"
          name="phoneNumber"
          value={employee.phoneNumber || ""}
          onChange={onChange}
        />
      </div>
      <div>
        <label htmlFor="dateOfBirth">Date of Birth:</label>
        <input
          type="date"
          id="dateOfBirth"
          name="dateOfBirth"
          value={employee.dateOfBirth ? employee.dateOfBirth.split("T")[0] : ""}
          onChange={onChange}
        />
      </div>
      <div>
        <label htmlFor="hireDate">Hire Date:</label>
        <input
          type="date"
          id="hireDate"
          name="hireDate"
          value={employee.hireDate ? employee.hireDate.split("T")[0] : ""}
          onChange={onChange}
        />
      </div>
      <div>
        <label htmlFor="jobTitle">Job Title:</label>
        <input
          type="text"
          id="jobTitle"
          name="jobTitle"
          value={employee.jobTitle || ""}
          onChange={onChange}
        />
      </div>
      <div>
        <label htmlFor="departmentId">Department ID:</label>
        <input
          type="number"
          id="departmentId"
          name="departmentId"
          value={employee.departmentId || ""}
          onChange={onChange}
        />
      </div>
      <div>
        <label htmlFor="userName">Username:</label>
        <input
          type="text"
          id="userName"
          name="userName"
          value={employee.userName || ""}
          onChange={onChange}
        />
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          value={employee.password || ""}
          onChange={onChange}
        />
      </div>
    </form>
  );
};

export default EmployeeForm;
