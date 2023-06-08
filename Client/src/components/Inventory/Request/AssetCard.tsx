import React, { useState } from 'react';
import { Button, Card, Modal, Form } from 'react-bootstrap';
import axios from 'axios';

interface Asset {
  id: number;
  name: string;
  status: string;
}

interface CardComponentProps {
  assets: Asset[];
}

interface EmployeeRequestDTO {
  EmployeeId: number;
  AssetId: number;
}

const AssetCard: React.FC<CardComponentProps> = ({ assets }) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedAsset, setSelectedAsset] = useState<Asset | null>(null);
  const [employeeId, setEmployeeId] = useState<number | ''>('');

  const handleRequestClick = (asset: Asset) => {
    setSelectedAsset(asset);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleSubmitRequest = async () => {
    if (selectedAsset && employeeId !== '') {
      try {
        const employeeRequestDto: EmployeeRequestDTO = {
          EmployeeId: employeeId,
          AssetId: selectedAsset.id
        };
        const response = await axios.post('http://localhost:5087/api/EmployeeRequest', employeeRequestDto);
        // Handle successful response, e.g., show success message or update state
        console.log(response.data);
      } catch (error) {
        // Handle error, e.g., show error message or update state
        console.error(error);
      }
      setShowModal(false);
    }
  };

  const handleEmployeeIdChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmployeeId(Number(event.target.value));
  };

  return (
    <div className="card-container">
      {assets.map((asset) => (
        <Card key={asset.id}>
          <Card.Body>
            <Card.Title>{asset.name}</Card.Title>
            <Card.Text>{asset.status}</Card.Text>                                
              <Button variant="primary" onClick={() => handleRequestClick(asset)}>
                Request
              </Button>
           
          </Card.Body>
        </Card>
      ))}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Request Asset</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedAsset && (
            <Form>
              <Form.Group>
                <Form.Label>Employee ID</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Enter employee ID"
                  value={employeeId}
                  onChange={handleEmployeeIdChange}
                />
              </Form.Group>
            </Form>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmitRequest}>
            Submit Request
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default AssetCard;




