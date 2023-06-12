import { ChangeEvent, useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import "../../../../css/Support/Support.css";

interface FormData {
  employeeId: number;
  email: string;
  issueTypeId: number; 
  problem: string;
}

interface IssueTypeData {
  id: number;
  name: string;
}

interface NewTicketFormProps {
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const NewTicketForm: React.FC<NewTicketFormProps> = ({ setShowModal }) => {
  const [formData, setFormData] = useState<FormData>({
    employeeId: 0,
    email: "",
    issueTypeId: 0, 
    problem: "",
  });
  const [issueTypes, setIssueTypes] = useState<IssueTypeData[]>([]);
  const [emailError, setEmailError] = useState<string>("");
  const [problemError, setProblemError] = useState<string>("");
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  useEffect(() => {
    const fetchIssueTypes = async () => {
      try {
        const response = await axios.get("http://localhost:5087/Api/IssueType");
        setIssueTypes(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchIssueTypes();
  }, []);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!validateProblem() || !validateEmail()) {
      return;
    }
    try {
      const response = await axios.post(
        "http://localhost:5087/Api/Ticket",
        formData
      );
      console.log(response.data);
      setShowSuccessModal(true);
    } catch (error) {
      console.log(error);
      alert("Not added!");
    }
  };

  const handleChange = (
    event: ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const validateEmail = (): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; 
    const isValid = emailRegex.test(formData.email);
    if (!isValid) {
      setEmailError("Invalid email address");
    } else {
      setEmailError("");
    }
    return isValid;
  };
  const validateProblem = (): boolean => {
    const contactRegex = /^[A-Za-z\s]{0,100}$/; // Regex to match a characters
    const isValid = contactRegex.test(formData.problem );
    if (!isValid) {
      setProblemError(
        "Input should only contain English letters and limit to 100 characters"
      );
    } else {
      setProblemError("");
    }
    return isValid;
  };

  const handleCloseSuccessModal = () => {
    setShowSuccessModal(false);
    setShowModal(false);
    window.location.reload();
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Control
            type="number"
            placeholder="Enter your ID *"
            required
            name="employeeId"
            onChange={handleChange}
          />
        </Form.Group>
        <br />
        <Form.Group>
          <Form.Control
            type="text"
            placeholder="Enter your valid Email *( example@gmail.com )"
            required
            name="email"
            onChange={handleChange}
          />
          {emailError && (
            <Form.Text className="text-danger">{emailError}</Form.Text>
          )}
        </Form.Group>
        <br />
        <Form.Group>
          <Form.Select
            aria-label="Default select example"
            name="issueTypeId"
            value={formData.issueTypeId}
            required
            onChange={handleChange}
          >
            <option value="">Select Issue Type</option>
            {issueTypes.map((issueType) => (
              <option key={issueType.id} value={issueType.id}>
                {issueType.name}
              </option>
            ))}
          </Form.Select>
        </Form.Group>
        <br />
        <Form.Group>
          <Form.Control
            as="textarea"
            placeholder="Problem ( 100 characters only )*"
            required
            name="problem"
            rows={3}
            onChange={handleChange}
          />
           {problemError && (
            <Form.Text className="text-danger">{problemError}</Form.Text>
          )}
        </Form.Group>
        <br />
        <Button variant="success" type="submit">
          Submit
        </Button>
      </Form>

      <Modal show={showSuccessModal} onHide={handleCloseSuccessModal} centered>
        <Modal.Body style={{ backgroundColor: "green" }}>
          <div className="text-center">
            <FontAwesomeIcon icon={faCheck} className="success-icon" />
            <p className="success-message">
              Your ticket has been submitted successfully.
            </p>
            <p className="success-message">
              We will reply as soon as possible.
            </p>
          </div>
          <Button variant="secondary" onClick={handleCloseSuccessModal}>
            Close
          </Button>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default NewTicketForm;