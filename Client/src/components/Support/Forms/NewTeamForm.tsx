import { useState, useEffect } from "react";
import { Button, Form } from "react-bootstrap";
import axios from "axios";

//Define form data types using interfaces
interface FormData {  name: string;  description: string;  issueTypeId: string;  image: File | null;};
interface IssueTypeData  {  id: number;  name: string;};

const NewTeamForm = () => {
  const [formData, setFormData] = useState<FormData>({name: "", description: "", issueTypeId: "", image: null, }); //Declare a use state variable & function

  const [issueTypes, setIssueTypes] = useState<IssueTypeData[]>([]);

  useEffect(() => {
    const fetchIssueTypes = async () => {
      const response = await axios.get("http://localhost:5087/Api/IssueType");  
      setIssueTypes(response.data);
    };
    fetchIssueTypes();
  }, []);

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
      alert("Successfully added!");
      // reset the form after successfully submitting the data
      setFormData({ name: "", description: "", issueTypeId: "", image: null,});
    } catch (error) {
      console.log(error);
      alert(" Not added!");
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

  return (
    <Form onSubmit={handleSubmit}>
       <Form.Group>  <Form.Control type="file" placeholder="Image"  name="image" onChange={handleChange} /> </Form.Group>
      <br />
      <Form.Group>  <Form.Control type="text" placeholder="Name *"  required  name="name" value={formData.name} onChange={handleChange} />  </Form.Group>
      <br />
      <Form.Group>  <Form.Control type="text" placeholder="Description *"  required  name="description" value={formData.description} onChange={handleChange} />  </Form.Group>
      <br />
      <Form.Group> <Form.Select aria-label="Default select example" name="issueTypeId"  value={formData.issueTypeId} onChange={handleChange} >
          <option value="">Select Issue Type</option>
          {issueTypes.map((issueType) => (
            <option key={issueType.id} value={issueType.id}>
              {issueType.name}
            </option>
          ))}
        </Form.Select>
      </Form.Group> 
      <br />
      <Button variant="success" type="submit">  Submit  </Button>    
    </Form>
  );
};

export default NewTeamForm;


