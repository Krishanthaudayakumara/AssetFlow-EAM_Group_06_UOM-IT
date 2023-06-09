import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { getSubCategories } from "../../api/subCategoryApi";
import { fetchSuppliers } from "../../api/supplierApi";
import axios from "axios";

type CreateSupplyChainModalProps = {
  show: boolean;
  onClose: () => void;
  onCreate: (supplyChainData: any) => void;
};

type SubCategory = {
  id: number;
  name: string;
  // Add any other properties if available
};

const CreateSupplyChainModal: React.FC<CreateSupplyChainModalProps> = ({
  show,
  onClose,
  onCreate,
}) => {
  const [supplierId, setSupplierId] = useState<number>(0);
  const [suppliers, setSuppliers] = useState<any[]>([]);
  const [assetName, setAssetName] = useState<string>("");
  const [subCategoryId, setSubCategoryId] = useState<number>(0);
  const [subCategories, setSubCategories] = useState<SubCategory[]>([]);
  const [lowQuantityThreshold, setLowQuantityThreshold] = useState<number>(0);
  const [orderQuantity, setOrderQuantity] = useState<number>(0);
  const [availableAssetNames, setAvailableAssetNames] = useState<string[]>([]);
  const [addingNewAssetName, setAddingNewAssetName] = useState<boolean>(false);

  useEffect(() => {
    fetchAllSuppliers();
    fetchAllSubCategories();
    fetchAvailableAssetNames();
  }, []);

  const fetchAllSuppliers = async () => {
    try {
      const response = await fetchSuppliers();
      setSuppliers(response);
    } catch (error) {
      console.error("Error getting suppliers:", error);
    }
  };

  const fetchAllSubCategories = async () => {
    try {
      const response = await getSubCategories();
      const responseData = response.data;
      const transformedData = responseData.map((subCategory: any) => ({
        id: subCategory.id,
        name: subCategory.name,
        // Map other properties if available
      }));
      setSubCategories(transformedData);
    } catch (error) {
      console.error("Error getting subcategories:", error);
    }
  };

  const fetchAvailableAssetNames = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5087/api/Asset/summary"
      );
      const responseData = response.data;
      const assetNames = responseData.map((asset: any) => asset.assetName);
      setAvailableAssetNames(assetNames);
    } catch (error) {
      console.error("Error getting asset names:", error);
    }
  };

  const handleCreate = () => {
    const supplier = suppliers.find((supplier) => supplier.id === supplierId);
    const subCategory = subCategories.find(
      (subCategory) => subCategory.id === subCategoryId
    );

    const supplyChainData = {
      supplierId: supplier?.id,
      subCategoryId: subCategory?.id,
      assetName,
      status: "active",
      lowQuantityThreshold,
      orderQuantity,
    };

    console.log("from modal:", supplyChainData);
    onCreate(supplyChainData);
  };

  const toggleAddNewAssetName = () => {
    setAddingNewAssetName(!addingNewAssetName);
    setAssetName("");
  };

  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Create Supply Chain</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="supplierId">
            <Form.Label>Supplier</Form.Label>
            <Form.Control
              as="select"
              value={supplierId}
              onChange={(e) => setSupplierId(parseInt(e.target.value))}
            >
              <option value={0}>Select Supplier</option>
              {suppliers.map((supplier) => (
                <option key={supplier.id} value={supplier.id}>
                  {supplier.name} - {supplier.email}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
          <Form.Group controlId="assetName">
            <Form.Label>Asset Name</Form.Label>
            {addingNewAssetName ? (
              <>
                <Form.Control
                  type="text"
                  value={assetName}
                  onChange={(e) => setAssetName(e.target.value)}
                  placeholder="Enter New Asset Name"
                />
                <Button variant="danger" onClick={toggleAddNewAssetName}>
                  - Select Available Asset
                </Button>
              </>
            ) : (
              <>
                <Form.Control
                  as="select"
                  value={assetName}
                  onChange={(e) => setAssetName(e.target.value)}
                >
                  <option value="">Select Asset Name</option>
                  {availableAssetNames.map((name) => (
                    <option key={name} value={name}>
                      {name}
                    </option>
                  ))}
                </Form.Control>
                <Button variant="primary" onClick={toggleAddNewAssetName}>
                  + Add New Asset
                </Button>
              </>
            )}
          </Form.Group>
          <Form.Group controlId="subCategoryId">
            <Form.Label>Subcategory</Form.Label>
            <Form.Control
              as="select"
              value={subCategoryId}
              onChange={(e) => setSubCategoryId(parseInt(e.target.value))}
            >
              <option value={0}>Select Subcategory</option>
              {subCategories.map((subCategory) => (
                <option key={subCategory.id} value={subCategory.id}>
                  {subCategory.name}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
          <Form.Group controlId="lowQuantityThreshold">
            <Form.Label>Low Quantity Threshold</Form.Label>
            <Form.Control
              type="number"
              value={lowQuantityThreshold}
              onChange={(e) =>
                setLowQuantityThreshold(parseInt(e.target.value))
              }
            />
          </Form.Group>
          <Form.Group controlId="orderQuantity">
            <Form.Label>Order Quantity</Form.Label>
            <Form.Control
              type="number"
              value={orderQuantity}
              onChange={(e) => setOrderQuantity(parseInt(e.target.value))}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleCreate}>
          Create
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CreateSupplyChainModal;
