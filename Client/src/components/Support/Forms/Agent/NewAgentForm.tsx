import { useState, useEffect } from "react";
import { Alert, Button, Form } from "react-bootstrap";
import axios, { AxiosError } from "axios";
import AddConfirmation from "../../ConfirmMessages/AddConfirmation";

interface FormData {
  firstName: string;
  lastName: string;
  contact: string;
  position: string;
  email: string;
  teamId: string;
  agentStatus: string;
  image: File | null;
}
interface TeamData {
  id: number;
  name: string;
}

const NewAgentForm = () => {
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    contact: "",
    position: "",
    email: "",
    teamId: "",
    agentStatus: "",
    image: null,
  });
  const [teams, setTeams] = useState<TeamData[]>([]);
  const [contactError, setContactError] = useState<string>("");
  const [emailError, setEmailError] = useState<string>("");
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    const fetchTeams = async () => {
      const response = await axios.get("http://localhost:5087/Api/Team");
      setTeams(response.data);
    };
    fetchTeams();
  }, []);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrorMessage(null);
    if (!validateContact() || !validateEmail()) {
      return;
    }
    try {
      const formDataWithImage = new FormData();
      formDataWithImage.append("firstName", formData.firstName);
      formDataWithImage.append("lastName", formData.lastName);
      formDataWithImage.append("contact", formData.contact);
      formDataWithImage.append("position", formData.position);
      formDataWithImage.append("email", formData.email);
      formDataWithImage.append("teamId", formData.teamId);
      formDataWithImage.append("agentStatus", formData.agentStatus);

      if (formData.image) {
        formDataWithImage.append("profileImage", formData.image);
      }
      const response = await axios.post(
        "http://localhost:5087/Api/Agent",
        formDataWithImage,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
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

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement & HTMLSelectElement>
  ) => {
    if (event.target.name === "image") {
      setFormData({
        ...formData,
        image: event.target.files ? event.target.files[0] : null,
      });
    } else {
      setFormData({
        ...formData,
        [event.target.name]: event.target.value,
      });
    }
  };

  const validateContact = (): boolean => {
    const contactRegex = /^\d{10}$/; // Regex to match a 10-digit phone number
    const isValid = contactRegex.test(formData.contact);
    if (!isValid) {
      setContactError("Invalid contact number");
    } else {
      setContactError("");
    }
    return isValid;
  };

  const validateEmail = (): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Regex to match email format
    const isValid = emailRegex.test(formData.email);
    if (!isValid) {
      setEmailError("Invalid email address");
    } else {
      setEmailError("");
    }
    return isValid;
  };
  const handleCloseSuccessModal = () => {
    setShowSuccessModal(false);
    window.location.reload();
  };


  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group>
        <Form.Control
          type="file"
          name="image"
          required
          onChange={handleChange}
        />
        <label>( jpeg, png, gif )</label>
      </Form.Group>
      <br />
      <Form.Group>
        <Form.Control
          type="text"
          placeholder="Agent First Name *"
          required
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
        />
      </Form.Group>
      <br />
      <Form.Group>
        <Form.Control
          type="text"
          placeholder="Agent Last Name *"
          required
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
        />
      </Form.Group>
      <br />
      <Form.Group>
        <Form.Control
          type="text"
          placeholder="Valid Contact *"
          required
          name="contact"
          value={formData.contact}
          onChange={handleChange}
        />
        <label>(10 digits only)</label>
        {contactError && (
          <Form.Text className="text-danger">{contactError}</Form.Text>
        )}
      </Form.Group>
      <br />
      <Form.Group>
        <Form.Control
          type="text"
          placeholder="Job Position *"
          required
          name="position"
          value={formData.position}
          onChange={handleChange}
        />
      </Form.Group>
      <br />
      <Form.Group>
        <Form.Control
          type="text"
          placeholder="Valid Email *"
          required
          name="email"
          value={formData.email}
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
          name="teamId"
          value={formData.teamId}
          onChange={handleChange}
        >
          <option value="">Select Team</option>
          {teams.map((team) => (
            <option key={team.id} value={team.id}>
              {team.name}
            </option>
          ))}
        </Form.Select>
      </Form.Group>
      <br />
      <Form.Group>
        <Form.Select
          aria-label="Default select example"
          name="agentStatus"
          value={formData.agentStatus}
          onChange={handleChange}
        >
           <option value="Status">Select Status</option>
          <option value="Not Available">Not Available</option>
          <option value="Available">Available</option>
        </Form.Select>
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
        formData={formData.firstName}
      />
    </Form>
  );
};

export default NewAgentForm;

