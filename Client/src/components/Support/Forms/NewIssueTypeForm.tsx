import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import axios from "axios";
import AddConfirmation from "../ConfirmMessages/AddConfirmation";

interface FormData {
  name: string;
}

const NewIssueTypeForm = () => {
  const [formData, setFormData] = useState<FormData>({ name: "" });
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:5087/Api/IssueType",
        formData
      );
      console.log(response.data);
      setShowSuccessModal(true);
    } catch (error) {
      console.log(error);
      alert("Not added!");
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleCloseSuccessModal = () => {
    setShowSuccessModal(false);
    window.location.reload();
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group>
        <Form.Label>Issue Type *</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter the Issue Type"
          required
          name="name"
          onChange={handleChange}
        />
      </Form.Group>
      <br />
      <Button variant="success" type="submit">
        Submit
      </Button>

      <AddConfirmation
        show={showSuccessModal}
        handleClose={handleCloseSuccessModal}
        formData={formData.name}
      />
    </Form>
  );
};

export default NewIssueTypeForm;

