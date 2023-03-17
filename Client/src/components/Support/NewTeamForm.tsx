import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import axios from "axios";

type FormData = {
  name: string;
  description: string;
  issueTypeId: number;
};

const NewTeamForm = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    description: "",
    issueTypeId: 0,
  });

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const response = await axios.post("http://localhost:5224/Api/Team", formData);
      console.log(response.data);
    } catch (error) {
      console.log(error);
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

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group>
        <Form.Control
          type="text"
          placeholder="Name *"
          required
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
      </Form.Group>
      <br />

      <Form.Group>
        <Form.Control
          type="text"
          placeholder="Description *"
          required
          name="description"
          value={formData.description}
          onChange={handleChange}
        />
      </Form.Group>
      <br />

      <Form.Group>
        <Form.Control
          type="number"
          placeholder="IssueTypeId"
          required
          name="issueTypeId"
          value={formData.issueTypeId}
          onChange={handleChange}
        />
      </Form.Group>
      <br />

      <Button variant="success" type="submit">
        Submit
      </Button>
    </Form>
  );
};

export default NewTeamForm;
