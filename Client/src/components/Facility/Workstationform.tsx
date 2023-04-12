import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Form, Button } from "react-bootstrap";

function Workstationform() {
  return (
    <Form>
      <Form.Group className="mb-3" controlId="workstationId">
        <Form.Label>workstation Id</Form.Label>
        <Form.Control type="text" placeholder="Enter workstation Id" required />
        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="workstation_name">
        <Form.Label>Workstation name</Form.Label>
        <Form.Control type="text" placeholder="Enter workstation name" />
      </Form.Group>

      <Button variant="success" type="submit">
        Save the changes
      </Button>
    </Form>
  );
}

export default Workstationform;
