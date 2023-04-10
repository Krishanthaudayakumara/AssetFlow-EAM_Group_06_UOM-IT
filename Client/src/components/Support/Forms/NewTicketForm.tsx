import { ChangeEvent, useState } from "react";
import { Button, Form } from "react-bootstrap";
import axios from "axios";

type FormData = {ticketName: string;ticketPosition: string; department: string; email: string; pending: number; completed: number; status: string;};

const NewTicketForm = () => {
  const [formData, setFormData] = useState<FormData>({ ticketName: "", ticketPosition: "", department: "", email: "", pending: 0, completed: 0, status: "", });

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const response = await axios.post("API_URL", formData);
      console.log(response.data);
      
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (
    event: ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement >
  ) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group>
        <Form.Control
          type="number"
          placeholder="Enter your ID"
          required
          name="ID"
          
          onChange={handleChange}
        />
      </Form.Group>
      <br />
      <Form.Group>
        <Form.Control
          type="text"
          placeholder="Ticket Name *"
          required
          name="ticketName"
          value={formData.ticketName}
          onChange={handleChange}
        />
      </Form.Group>
      <br />

      <Form.Group>
        <Form.Control
          type="text"
          placeholder="Ticket Position *"
          required
          name="ticketPosition"
          value={formData.ticketPosition}
          onChange={handleChange}
        />
      </Form.Group>
      <br />

      <Form.Group>
        <Form.Control
          type="text"
          placeholder="Department *"
          required
          name="department"
          value={formData.department}
          onChange={handleChange}
        />
      </Form.Group>
      <br />

      <Form.Group>
        <Form.Control
          type="email"
          placeholder="Email *"
          required
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
      </Form.Group>
      <br />

      

      <Form.Group>
        <Form.Control
          type="number"
          placeholder="Completed"
          required
          name="completed"
          value={formData.completed}
          onChange={handleChange}
        />
      </Form.Group>
      <br />

      <Form.Group>
        <Form.Select
          aria-label="Default select example"
          name="status"
          value={formData.status}
          onChange={handleChange}
        >
          <option value="1">Available</option>
          <option value="2">Not Available</option>
        </Form.Select>
      </Form.Group>
      <br />

      <Button variant="success" type="submit">Submit</Button>
    </Form>
  );
};

export default NewTicketForm


