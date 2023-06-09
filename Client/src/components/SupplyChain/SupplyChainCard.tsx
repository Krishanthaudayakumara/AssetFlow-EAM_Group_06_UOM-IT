import React from "react";
import { Card, Button, Col, Row } from "react-bootstrap";

type SupplyChainCardProps = {
  supplyChain: any;
  onDelete: (id: number) => void;
  onActivate: (id: number) => void;
  onDeactivate: (id: number) => void;
};

const SupplyChainCard: React.FC<SupplyChainCardProps> = ({
  supplyChain,
  onDelete,
  onActivate,
  onDeactivate,
}) => {
  const handleDelete = () => {
    onDelete(supplyChain.id);
  };

  const handleActivate = () => {
    onActivate(supplyChain.id);
  };

  const handleDeactivate = () => {
    onDeactivate(supplyChain.id);
  };

  const getStatusStyle = () => {
    return supplyChain.status === "active" ? "text-success" : "text-danger";
  };

  return (
    <Card>
      <Row>
        <Col xs={4} md={4}>
          <div
            style={{ height: "200px", width: "100%", overflow: "hidden" }}
          >
            <Card.Img
              variant="top"
              src={supplyChain.assetImage}
              style={{ objectFit: "cover", height: "100%", width: "100%" }}
            />
          </div>
        </Col>
        <Col xs={6} md={6}>
          <Card.Body>
            <Card.Title>{supplyChain.assetName}</Card.Title>
            <Card.Text>Supply Chain ID: {supplyChain.id}</Card.Text>

            <Card.Text>Supplier: {supplyChain.supplier.name}</Card.Text>
            <Card.Text>Subcategory: {supplyChain.subCategory.name}</Card.Text>
            <Card.Text className={getStatusStyle()}>
              Status: {supplyChain.status}
            </Card.Text>
            <Card.Text>
              Low Quantity Threshold: {supplyChain.lowQuantityThreshold}
            </Card.Text>
            <Card.Text>Order Quantity: {supplyChain.orderQuantity}</Card.Text>

          </Card.Body>
        </Col>
        <Col xs={2} md={2}>
        <Card.Body>
        {supplyChain.status === "active" ? (
              <Button variant="danger" onClick={handleDeactivate}>
                Deactivate
              </Button>
            ) : (
              <Button variant="success" onClick={handleActivate}>
                Activate
              </Button>
            )}
        <Button variant="primary" onClick={handleDelete}>
              Delete
            </Button>
            
          </Card.Body>
            </Col>

      </Row>
    </Card>
  );
};

export default SupplyChainCard;
