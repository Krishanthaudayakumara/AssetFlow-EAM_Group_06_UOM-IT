import React, { useEffect, useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { EditAsset, Stock } from "../../../types";
import { getStock } from "../../../api/stockApi";

interface AssetEditModalProps {
  show: boolean;
  asset: EditAsset | null;

  onUpdate: (updatedAsset: EditAsset) => void;
  onClose: () => void;
}

const AssetEditModal: React.FC<AssetEditModalProps> = ({
  show,
  asset,
  onUpdate,
  onClose,
}) => {
  const [name, setName] = useState(asset ? asset.name : "");
  const [description, setDescription] = useState(
    asset ? asset.description : ""
  );
  const [stockId, setStockId] = useState(asset ? asset.stockId : 0);
  const [stocks, setStocks] = useState<Stock[]>([]);

  const [status, setStatus] = useState(asset ? asset.status : "");
  const [condition, setCondition] = useState(asset ? asset.condition : "");
  const [warrantyExpiration, setWarrantyExpiration] = useState(
    asset ? asset.warrantyExpiration : ""
  );
  const [image, setImage] = useState<File | null>(null);

  useEffect(() => {
    const fetchStocks = async () => {
      try {
        const response = await getStock();
        const stocks = response.data;
        // Update the component state with the fetched stocks
        setStocks(stocks);
      } catch (error) {
        // Handle error
      }
    };

    fetchStocks();
  }, []);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const updatedAsset: EditAsset = {
      id: asset ? asset.id : 0,
      name,
      description,
      stockId,
      status,
      condition,
      warrantyExpiration,
      image,
    };

    console.log("Updated asset:", updatedAsset);

    onUpdate(updatedAsset);
  };

  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>{asset ? "Edit Asset" : "Create Asset"}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter asset name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="description">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Enter asset description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="status">
            <Form.Label>Status</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter asset status"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="condition">
            <Form.Label>Condition</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter asset condition"
              value={condition}
              onChange={(e) => setCondition(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="warrantyExpiration">
            <Form.Label>Warranty Expiration</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter warranty expiration"
              value={warrantyExpiration}
              onChange={(e) => setWarrantyExpiration(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="stockId">
            <Form.Label>Stock</Form.Label>
            <Form.Control
              as="select"
              value={stockId}
              onChange={(e) => setStockId(Number(e.target.value))}
            >
              <option value={0}>Select a stock</option>
              {stocks.map((stock) => (
                <option key={stock.id} value={stock.id}>
                  {stock.name}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
          <Form.Group controlId="image">
            <Form.Label>Image</Form.Label>
            <Form.Control
              type="file"
              accept="image/*"
              onChange={(e) => {
                const inputElement = e.target as HTMLInputElement;
                const file = inputElement.files && inputElement.files[0];
                setImage(file || null);
              }}
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Save
          </Button>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AssetEditModal;
