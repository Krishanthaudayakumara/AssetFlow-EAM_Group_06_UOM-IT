import axios from "axios";
import { useState } from "react";
import { Button, Form } from "react-bootstrap";

interface AgentData {
  firstname: string;
  lastname: string;
  contact: string;
  position: string;
  email: string;
  team: string;
  status: string;
  profileimage: File | null;
}

const AddAgent = () => {
  const [agent, setAgent] = useState<AgentData>({
    firstname: "",
    lastname: "",
    contact: "",
    position: "",
    email: "",
    team: "",
    status: "",
    profileimage: null,
  });

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      
      const response = await axios.post(
        "http://localhost:5224/Api/Agent",
        agent
      );
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (
    event: React.ChangeEvent<
      HTMLInputElement 
    >
  ) => {
    const { name, value } = event.target;
    setAgent({ ...agent, [name]: value });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group>
        <Form.Control
          type="text"
          placeholder="First Name *"
          name="firstname"
          value={agent.firstname}
          onChange={handleChange}
          required
        />
      </Form.Group>
      <br />

      <Form.Group>
        <Form.Control
          type="text"
          placeholder="Last Name *"
          name="lastname"
          value={agent.lastname}
          onChange={handleChange}
          required
        />
      </Form.Group>
      <br />

      <Form.Group>
        <Form.Control
          type="text"
          placeholder="Contact *"
          name="contact"
          value={agent.contact}
          onChange={handleChange}
          required
        />
      </Form.Group>
      <br />

      <Form.Group>
        <Form.Control
          type="text"
          placeholder="Position *"
          name="position"
          value={agent.position}
          onChange={handleChange}
          required
        />
      </Form.Group>
      <br />

      <Form.Group>
        <Form.Control
          type="text"
          placeholder="Email *"
          name="email"
          value={agent.email}
          onChange={handleChange}
          required
        />
      </Form.Group>
      <br />

      <Form.Group>
        <Form.Control
          type="text"
          placeholder="Team ID *"
          name="team"
          value={agent.team}
          onChange={handleChange}
          required
        />
      </Form.Group>
      <br />

      <Form.Group>
        <Form.Control
          type="text"
          placeholder="Agent Status *"
          name="status"
          value={agent.status}
          onChange={handleChange}
          required
        />
      </Form.Group>
      <br />

      
      <br />

      <Button variant="success" type="submit">
        Submit
      </Button>
    </Form>
  );
};

export default AddAgent;
