import React, { useState } from "react";
import { Container, Button, Col, Row } from "react-bootstrap";
import CreateSupplyChainModal from "../../components/SupplyChain/CreateSupplyChainModal";
import SupplyChainList from "../../components/SupplyChain/SupplyChainList";
import { createSupplyChain } from "../../api/supplyChainApi";

type SupplyChainData = {
  supplierId: number;
  assetName: string;
  subCategoryId: number;
  status: string;
  lowQuantityThreshold: number;
  orderQuantity: number;
};

const SupplyChainPage: React.FC = () => {
  const [showModal, setShowModal] = useState<boolean>(false);

  const handleCreateSupplyChain = async (supplyChainData: SupplyChainData) => {
    try {
      await createSupplyChain(supplyChainData);
      setShowModal(false);
      // Handle success
      console.log("Supply chain created successfully");
    } catch (error) {
      // Handle error
      console.error("Error creating supply chain:", error);
    }
  };

  return (
    <Container>
      <Row>
        <Col>
          <h2 className="page-heading">SUPPLY CHAINS</h2>
        </Col>
        <Col md={4}>
          <Button
            className="btn-purple"
            variant="primary"
            onClick={() => setShowModal(true)}
          >
            Create Supply Chain
          </Button>
        </Col>
      </Row>

      <SupplyChainList />
      <CreateSupplyChainModal
        show={showModal}
        onClose={() => setShowModal(false)}
        onCreate={handleCreateSupplyChain}
      />
    </Container>
  );
};

export default SupplyChainPage;
