import { useState} from "react";
import { Button, Form } from "react-bootstrap";
import axios from "axios";

interface FormData {  name: string;};

const NewIssurTypeForm = () => {

    const [formData, setFormData] = useState<FormData>({name: "", });

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
    
        try {
          const response = await axios.post("http://localhost:5087/Api/IssueType", formData);
          console.log(response.data);
          alert("Successfully added!");
          setFormData({ name: "", });
        } catch (error) {
          console.log(error);
          alert(" Not added!");
        }
      };

      const handleChange = (
        event: React.ChangeEvent<HTMLInputElement>
        ) => {
            setFormData({
              ...formData,
              [event.target.name]: event.target.value,
            });
          };
return(
    <Form onSubmit={handleSubmit}>
      <Form.Group>
        <Form.Control
          type="text"
          placeholder="Issue Type *"
          required
          name="name"          
          onChange={handleChange}
        />
      </Form.Group>
      <br/>
      <Button variant="success" type="submit">Submit</Button>
      </Form>
);
}; 

export default NewIssurTypeForm;