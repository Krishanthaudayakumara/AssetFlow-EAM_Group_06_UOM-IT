import React from 'react';
import {Table } from "react-bootstrap";
const ReportTable: React.FC = () => {
  return (
    <div>
    <Table striped bordered hover size="sm">
      <thead>
        <tr>
          <th>#</th>
          <th>User</th>
          <th>User Name</th>
          <th>Role</th>
          <th>Department</th>
          <th>Email</th>
          <th>Joined date</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>1</td>
          <td>Mark</td>
          <td>@mark</td>
          <td>Manager</td>
          <td>IT</td>
          <td>mark@99x.io</td>
          <td>2021-05-8</td>
          <td></td>
        </tr>
        <tr>
        <td>2</td>
          <td>Sam</td>
          <td>@Sam</td>
          <td>General User</td>
          <td>HR</td>
          <td>Sam@99x.io</td>
          <td>2021-06-8</td>
          <td></td>
          
        </tr>
        <tr>
        <td>3</td>
          <td>Jane</td>
          <td>@jane</td>
          <td>Manager</td>
          <td>Facility Management</td>
          <td>jane@99x.io</td>
          <td>2021-09-8</td>
          <td></td>
        </tr>
        <tr>
        <td>4</td>
          <td>Mark</td>
          <td>@mark</td>
          <td>Manager</td>
          <td>Development</td>
          <td>mark@99x.io</td>
          <td>2021-05-8</td>
          <td></td>
        </tr>
      </tbody>
    </Table>
    </div>
  );
};

export default ReportTable;
