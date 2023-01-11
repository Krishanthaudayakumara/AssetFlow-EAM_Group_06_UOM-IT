import React from "react";
import { Table } from "react-bootstrap";
function BasicExample() {
    return (
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Description</th>
            <th>CodeNumber</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>Computers</td>
            <td>personal</td>
            <td>001</td>
          </tr>
          <tr>
            <td>2</td>
            <td>mouse</td>
            <td>wireless</td>
            <td>002</td>
          </tr>
          <tr>
            <td>3</td>
            <td colSpan={2}>headphone</td>
            <td>003</td>
          </tr>
        </tbody>
      </Table>
    );
  }
  
  export default BasicExample;