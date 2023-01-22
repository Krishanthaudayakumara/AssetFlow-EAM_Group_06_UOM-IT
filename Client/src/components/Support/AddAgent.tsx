import { Button, Form } from "react-bootstrap";

const AddAgent = () => {
    return (
        <Form>
            <Form.Group>
                <Form.Control 
                      type="text"
                      placeholder="Name *"
                      required
                />
            </Form.Group><br/>

            <Form.Group>
                <Form.Control 
                      type="text"
                      placeholder="Position *"
                      required
                />
            </Form.Group><br/>

            <Form.Group>
                <Form.Control 
                      type="text"
                      placeholder="Department *"
                      required
                />
            </Form.Group><br/>

            <Form.Group>
                <Form.Control 
                      type="email"
                      placeholder="Email *"
                      required
                />
                           
            </Form.Group><br/>

            <Form.Group>
                <Form.Control 
                      type="number"
                      placeholder="Pending"
                      required
                />
                               
            </Form.Group><br/>

            <Form.Group>
                <Form.Control 
                      type="number"
                      placeholder="Completed"
                      required
                />
                               
            </Form.Group><br/>  

            <Form.Group>
            <Form.Select aria-label="Default select example">
                
                <option value="1">Available</option>
                <option value="2">Not Available</option>
            </Form.Select>
            </Form.Group><br/>

            <Button variant="success" type="submit">Submit</Button>
        </Form>
    )
}

export default AddAgent;