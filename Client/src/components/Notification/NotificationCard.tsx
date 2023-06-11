import React from "react";
import { Button, Card, Col, ListGroup, Row } from "react-bootstrap";
import { BsTrash } from "react-icons/bs";

interface Notification {
  id: number;
  title: string;
  message: string;
  imageUrl: string;
  createdAt: string;
}

const NotificationCard: React.FC<{ notification: Notification; onDelete: (id: number) => void }> = ({
  notification,
  onDelete,
}) => {
  const openDeleteModal = () => {
    onDelete(notification.id);
  };

  return (
    <ListGroup.Item>
      <Card>
        <Row>
          <Col xs={4} md={2}>
            <Card.Img src={notification.imageUrl} alt="Notification" width={100} height={100} />
          </Col>
          <Col xs={8} md={10}>
            <Card.Body>
              <Card.Title>{notification.title}</Card.Title>
              <Card.Text>{notification.message}</Card.Text>
              <Card.Text>Created At: {notification.createdAt}</Card.Text>
            </Card.Body>
          </Col>
        </Row>
        <Card.Footer>
          <Button variant="danger" onClick={openDeleteModal}>
            <BsTrash />
          </Button>
        </Card.Footer>
      </Card>
    </ListGroup.Item>
  );
};

export default NotificationCard;
