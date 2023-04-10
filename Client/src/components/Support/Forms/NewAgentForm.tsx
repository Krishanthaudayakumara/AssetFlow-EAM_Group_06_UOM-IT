import { useState, useEffect } from "react";
import { Button, Form } from "react-bootstrap";
import axios from "axios";

interface FormData { firstName: string;  lastName: string;  contact: string; position: string; email: string;  teamId: string; agentStatus: string;  image: File | null;};
interface TeamData  {  id: number;  name: string;};

const NewAgentForm = () => {
const [formData, setFormData] = useState<FormData>({firstName: "", lastName: "", contact: "", position: "", email: "", teamId: "",agentStatus: "",  image: null, });
const [teams, setTeams] = useState<TeamData[]>([]);

useEffect(() => {
    const fetchTeams = async () => {
      const response = await axios.get("http://localhost:5087/Api/Team");
      setTeams(response.data);
    };
    fetchTeams();
  }, []);

const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
   event.preventDefault();
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
      alert("Successfully added!"); 

      // reset the form after successfully submitting the data
      //setFormData({ firstName: "", lastName: "", contact: "", position: "", email: "", teamId: "",agentStatus: "",  image: null,}); 
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
       <Form.Group>
        <label>Profile Image</label>
        <Form.Control type="file" name="image" onChange={handleChange} />
       </Form.Group>
       <br />
       <Form.Group>
       <Form.Control type="text"  placeholder="First Name *" required  name="firstName" value={formData.firstName} onChange={handleChange} />
       </Form.Group>
       <br />   
       <Form.Group>
       <Form.Control type="text"  placeholder="Last Name *" required  name="lastName" value={formData.lastName} onChange={handleChange} />
       </Form.Group>
       <br />
       <Form.Group>
       <Form.Control type="text"  placeholder="Contact *" required  name="contact" value={formData.contact} onChange={handleChange} />
       </Form.Group>
       <br />
       <Form.Group>
       <Form.Control type="text"  placeholder="Position *" required  name="position" value={formData.position} onChange={handleChange} />
       </Form.Group>
       <br />
       <Form.Group>
       <Form.Control type="text"  placeholder="Email *" required  name="email" value={formData.email} onChange={handleChange} />
       </Form.Group>
       <br />         
       <Form.Group>
        <Form.Select  aria-label="Default select example"  name="teamId"  value={formData.teamId}  onChange={handleChange} >
          <option value="">Select Team</option>
          {teams.map((team) => (
            <option key={team.id} value={team.id}>{team.name}</option>
          ))}
        </Form.Select>
      </Form.Group>
      <br />
      <Form.Group>
        <Form.Select
          aria-label="Default select example"  name="agentStatus"  value={formData.agentStatus} onChange={handleChange} >
          <option value="Not Available">Not Available</option>
          <option value="Available">Available</option>          
        </Form.Select>
      </Form.Group> 
       <br />
      <Button variant="success" type="submit">Submit</Button>    
    </Form>
  );
};

export default NewAgentForm;