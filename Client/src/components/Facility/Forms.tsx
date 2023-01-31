import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form,Button } from 'react-bootstrap';

function Forms (){
    return(
        <Form>
        <Form.Group className="mb-3" controlId="buildingId">
          <Form.Label>Building Id</Form.Label>
          <Form.Control 
          type="text" 
          placeholder="Enter building Id" 
          required
          />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>
  
        <Form.Group className="mb-3" controlId="building name">
          <Form.Label>Building name</Form.Label>
          <Form.Control type="text" placeholder="Enter building name" />
        </Form.Group>
       
        <Button  variant='success' type="submit" >
          Add a new building
        </Button>
      </Form>
    )

}

export default Forms;