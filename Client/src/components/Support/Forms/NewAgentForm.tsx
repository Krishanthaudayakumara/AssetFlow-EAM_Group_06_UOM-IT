import axios from "axios";
import { useState } from "react";
import { Button, Form } from "react-bootstrap";

interface AgentData {
  image: File | null;
  firstname: string;
  lastname: string;
  contact: string;
  position: string;
  email: string;
  team: string;
  status: string;
}

const NewAgentForm = () => {
  const [agent, setAgent] = useState<AgentData>({
    image: null,
    firstname: "",
    lastname: "",
    contact: "",
    position: "",
    email: "",
    team: "",
    status: "",
  });
  const [image, setImage] = useState<File | null>(null);
  const [isSubmitSuccessful, setIsSubmitSuccessful] = useState(false);
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const formData = new FormData();
      formData.append("firstname", agent.firstname);
      formData.append("lastname", agent.lastname);
      formData.append("contact", agent.contact);
      formData.append("position", agent.position);
      formData.append("email", agent.email);
      formData.append("team", agent.team);
      formData.append("status", agent.status);
      if (image) {
        formData.append("image", image);
      }
      const response = await axios.post(
        "http://localhost:5224/Api/Agent",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement & HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    setAgent({ ...agent, [name]: value });
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setImage(event.target.files[0]);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group>
        <Form.Control
          type="file"
          placeholder="Image"
          name="image"
          onChange={handleChange}
        />
      </Form.Group>
      <br />
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

export default NewAgentForm;
