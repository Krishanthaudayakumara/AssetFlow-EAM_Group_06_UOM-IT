import { useState, useEffect } from "react";
import { Alert, Button, Form } from "react-bootstrap";
import axios, { AxiosError } from "axios";
import AddConfirmation from "../../ConfirmMessages/AddConfirmation";

//Define form data types using interfaces
interface FormData {
  name: string;
  description: string;
  issueTypeId: string;
  image: File | null;
}
interface IssueTypeData {
  id: number;
  name: string;
}

const NewTeamForm = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    description: "",
    issueTypeId: "",
    image: null,
  }); //Declare a use state variable & function

  const [issueTypes, setIssueTypes] = useState<IssueTypeData[]>([]);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [nameError, setNameError] = useState<string>("");
  const [desError, setDesError] = useState<string>("");

  useEffect(() => {
    const fetchIssueTypes = async () => {
      const response = await axios.get("http://localhost:5087/Api/IssueType");
      setIssueTypes(response.data);
    };
    fetchIssueTypes();
  }, []);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrorMessage(null);

    if (!validateTeamName() || !validateDescrption()) {
      return;
    }

    try {
      const formDataWithImage = new FormData();
      formDataWithImage.append("name", formData.name);
      formDataWithImage.append("description", formData.description);
      formDataWithImage.append("issueTypeId", formData.issueTypeId);

      if (formData.image) {
        formDataWithImage.append("profileImage", formData.image);
      }
      const response = await axios.post(
        "http://localhost:5087/Api/Team",
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

  const handleCloseSuccessModal = () => {
    setShowSuccessModal(false);
    window.location.reload();
  };

  const validateTeamName = (): boolean => {
    const contactRegex = /^[A-Za-z\s]{0,20}$/; // Regex to match a characters
    const isValid = contactRegex.test(formData.name);
    if (!isValid) {
      setNameError(
        "Team Name should only contain English letters and limit to 20 characters"
      );
    } else {
      setNameError("");
    }
    return isValid;
  };
  const validateDescrption = (): boolean => {
    const contactRegex = /^[A-Za-z\s]{0,50}$/; // Regex to match a characters
    const isValid = contactRegex.test(formData.description);
    if (!isValid) {
      setDesError(
        "Description should only contain English letters and limit to 50 characters"
      );
    } else {
      setDesError("");
    }
    return isValid;
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group>
        <label>Profile Picture ( jpeg , png , gif )</label>
        <Form.Control
          type="file"
          placeholder="Image"
          name="image"
          required
          onChange={handleChange}
          accept="image/jpeg, image/png, image/gif"
        />
      </Form.Group>
      <br />
      <Form.Group>
        {" "}
        <Form.Control
          type="text"
          placeholder="Team Name ( 20 characters only )*"
          required
          name="name"
          value={formData.name}
          onChange={handleChange}
        />{" "}
          {nameError && (
          <Form.Text className="text-danger">{nameError}</Form.Text>
        )}
      </Form.Group>
      <br />
      <Form.Group>
        {" "}
        <Form.Control
          type="text"
          placeholder="Team Description ( 50 characters only )*"
          required
          name="description"
          value={formData.description}
          onChange={handleChange}
        />{" "}
        {desError && (
          <Form.Text className="text-danger">{desError}</Form.Text>
        )}
      </Form.Group>
      <br />
      <Form.Group>
        {" "}
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
        {errorMessage && (
          <Alert variant="danger" className="mt-2">
            {errorMessage}
          </Alert>
        )}
      </Form.Group>
      <br />
      <Button variant="success" type="submit">
        {" "}
        Submit{" "}
      </Button>
      <AddConfirmation
        show={showSuccessModal}
        handleClose={handleCloseSuccessModal}
        formData={formData.name}
      />
    </Form>
  );
};

export default NewTeamForm;
