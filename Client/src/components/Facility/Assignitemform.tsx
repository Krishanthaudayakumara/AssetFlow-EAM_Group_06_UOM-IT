import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form,Button } from 'react-bootstrap';

function  Assigneditemform (){
    return(
        <Form>
        <Form.Group className="mb-3" controlId="itemId">
          <Form.Label>Item  Id</Form.Label>
          <Form.Control 
          type="text" 
          placeholder="Enter Item Id" 
          required
          />
         
        </Form.Group>
  
        <Form.Group className="mb-3" controlId="asset_name">
          <Form.Label>Asset name</Form.Label>
          <Form.Control type="text" placeholder="Enter  item name" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="asset_count">
          <Form.Label>Asset name</Form.Label>
          <Form.Control type="text" placeholder="Enter item count" />
        </Form.Group>
       
        <Button  variant='success' type="submit" >
            Save the changes
                    
        </Button>
      </Form>
    )

}

export default Assigneditemform ;