import React from "react";
import Form from "react-bootstrap/Form";
import { Button } from "react-bootstrap";

function AssignAssetUpdateForm(){

    return (
        <Form >
          <Form.Group className="mb-3" controlId="AssetId">
            <Form.Label>Asset Id</Form.Label>
            <Form.Control type="text" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="subcategory">
            <Form.Label>subcategory</Form.Label>
            <Form.Control type="text" />
                       
          </Form.Group>
          
          <Form.Group className="mb-3" controlId="Category">
            <Form.Label>Category</Form.Label>
            <Form.Control type="text" />
                   
          </Form.Group>
    
          <Form.Group controlId="Date">
            <Form.Label>Received Date</Form.Label>
            <Form.Control type="text" />
         
          </Form.Group>
          
          <Form.Group controlId="AssignedDate">
            <Form.Label>Assigned date </Form.Label>
            <Form.Control type="text" />
         
          </Form.Group>
          <Form.Group controlId="Assetcondition status">
            <Form.Label>Asset Condition status</Form.Label>
            <Form.Control type="text" />
         
          </Form.Group>
          <Form.Group controlId="Assigned status">
            <Form.Label>Assigned status</Form.Label>
            <Form.Control type="text" />
         
          </Form.Group>
    
          <Button variant="success" type="submit">
            update
          </Button>
        </Form>
      );
}
export default AssignAssetUpdateForm;




