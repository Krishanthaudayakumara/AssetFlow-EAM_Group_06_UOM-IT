import React, { useState } from 'react';
import { Container, Button } from 'react-bootstrap';
import CreateSupplyChainModal from '../../components/SupplyChain/CreateSupplyChainModal';
import SupplyChainList from '../../components/SupplyChain/SupplyChainList';
import { createSupplyChain } from '../../api/supplyChainApi';

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
      console.log('Supply chain created successfully');
    } catch (error) {
      // Handle error
      console.error('Error creating supply chain:', error);
    }
  };

  return (
    <Container>
      <h1>Supply Chains</h1>
      <Button variant="primary" onClick={() => setShowModal(true)}>
        Create Supply Chain
      </Button>
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
