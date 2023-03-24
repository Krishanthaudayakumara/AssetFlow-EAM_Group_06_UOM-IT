import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import axios from "axios";


type FormData = {
  name: string;
  description: string;
  issueTypeId: string;
  image: File | null;
};

const NewTeamForm = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    description: "",
    issueTypeId: "",
    image: null,
  });

  const [isSubmitSuccessful, setIsSubmitSuccessful] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  
    try {
      const formDataWithImage = new FormData();
      formDataWithImage.append("name", formData.name);
      formDataWithImage.append("description", formData.description);
      formDataWithImage.append("issueTypeId", formData.issueTypeId);
      if (formData.image) {
        formDataWithImage.append("profileImage", formData.image);
      }
      const response = await axios.post("http://localhost:5224/Api/Team", formDataWithImage, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(response.data);
      alert("Successfully added!");
  
      // reset the form after successfully submitting the data
      setFormData({
        name: "",
        description:"",
        issueTypeId:"",
        image: null,
      });
    } catch (error) {
      console.log(error);
    }
  };
  

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
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

      <Form.Group>
        <Form.Control
          type="file"
          placeholder="Image"
          name="image"
          onChange={handleChange}
        />
      </Form.Group>
      <br />

      <Button variant="success" type="submit">
        Submit
      </Button>

      {isSubmitSuccessful && (
        <div className="alert alert-success mt-3" role="alert">
          Successfully added!
        </div>
      )}
    </Form>
  );
};

export default NewTeamForm;


