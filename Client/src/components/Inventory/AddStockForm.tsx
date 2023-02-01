import React from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const AddStockForm = () =>{
    return (
        <Form>
             <Form.Group>
                <Form.Control
                type="text"
                placeholder="Stock number"
                required
                /> 
            </Form.Group>
            <Form.Group>
                <Form.Control
                type="text"
                placeholder="Name *"
                required
                />
            
            </Form.Group>
            <Form.Group>
                <Form.Control
                type="text"
                placeholder="Description"
                />
            </Form.Group>
            <Form.Group>
                <Form.Control
                type="text"
                placeholder="Category"
                required
                /> 
            </Form.Group>
            <Form.Group>
                <Form.Control
                type="text"
                placeholder="Brand"
                required
                /> 
            </Form.Group>
            <Form.Group>
                <Form.Control
                type="date"
                placeholder="Buy date"
                required
                /> 
            </Form.Group>
            <Form.Group>
                <Form.Control
                type="currency"
                placeholder="Cost"
                required
                /> 
            </Form.Group>
            <Form.Group>
                <Form.Control
                type="text"
                placeholder="Supplier"
                required
                /> 
            </Form.Group>
            <Form.Group>
                <Form.Control
                type="date"
                placeholder="Warranty date"
                required
                /> 
            </Form.Group>
            <Button variant="success" type="submit">
                Add new stock
            </Button>
        </Form>
    )
}
export default AddStockForm;
