
import { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import axios from "axios";

interface FeedbackFormProps {
  ticketId?: number;
  onClose: () => void;
}

const FeedbackForm: React.FC<FeedbackFormProps> = ({ ticketId, onClose }) => {
  const [condition, setCondition] = useState("");
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post("http://localhost:5087/Api/Feedback", {
        condition,
        comment,
        ticketId: ticketId || undefined,
      });

      // Handle successful submission
      console.log(response.data);
      onClose();
    } catch (error) {
      // Handle error
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <Modal show onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Submit Feedback</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formCondition">
            <Form.Label>Condition</Form.Label>
            <Form.Control
              type="text"
              value={condition}
              onChange={(e) => setCondition(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group controlId="formComment">
            <Form.Label>Comment</Form.Label>
            <Form.Control
              as="textarea"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              required
            />
          </Form.Group>
          <Button variant="primary" type="submit" disabled={loading}>
            {loading ? "Submitting..." : "Submit"}
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default FeedbackForm;
