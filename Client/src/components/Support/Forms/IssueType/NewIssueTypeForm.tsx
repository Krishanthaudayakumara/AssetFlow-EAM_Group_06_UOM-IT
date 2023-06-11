import { useState } from "react";
import { Button, Form, Alert } from "react-bootstrap";
import axios, { AxiosError } from "axios";
import AddConfirmation from "../../ConfirmMessages/AddConfirmation";

interface FormData {
  name: string;
}

interface Props {
  handleClose: () => void;
}

const NewIssueTypeForm: React.FC<Props> = ({ handleClose }) => {
  const [formData, setFormData] = useState<FormData>({ name: "" });
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [issueError, setIssueError] = useState<string>("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => { //Issue Type Post Method
    event.preventDefault();
    setErrorMessage(null);
    if (!validateIssueType()) {
      return;
    }
    try {
      const response = await axios.post(
        "http://localhost:5087/Api/IssueType",
        formData
      );
      console.log(response.data);
      setShowSuccessModal(true);
    } catch (error) {
      console.log(error);
      const axiosError = error as AxiosError;
      if (axiosError.response && axiosError.response.status === 400) {
        setErrorMessage(axiosError.response.data as string);
      } else {
        alert("Not added!");
      }
    }
  };

  const validateIssueType = (): boolean => {
    const contactRegex = /^[A-Za-z\s]{5,50}$/; // Regex to match a characters
    const isValid = contactRegex.test(formData.name);
    if (!isValid) {
      setIssueError("Input should only contain English letters and limit between 5 & 50");
    } else {
      setIssueError("");
    }
    return isValid;
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleCloseSuccessModal = () => {
    setShowSuccessModal(false);
    handleClose();
    window.location.reload();
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group>
        <Form.Label>Issue Type</Form.Label>
        <Form.Control
          type="text"
          placeholder="Only English letters between 5 & 50 *"
          required
          name="name"
          onChange={handleChange}
          value={formData.name}
        />
         {issueError && (
          <Form.Text className="text-danger">{issueError}</Form.Text>
        )}
        {errorMessage && (
          <Alert variant="danger" className="mt-2">
            {errorMessage}
          </Alert>
        )}
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

