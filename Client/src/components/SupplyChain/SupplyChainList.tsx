import React, { useEffect, useState } from 'react';
import { getAllSupplyChains, deleteSupplyChain, activateSupplyChain, deactivateSupplyChain } from '../../api/supplyChainApi';
import SupplyChainCard from './SupplyChainCard';

const SupplyChainList: React.FC = () => {
  const [supplyChains, setSupplyChains] = useState<any[]>([]);

  useEffect(() => {
    const fetchSupplyChains = async () => {
      try {
        const data = await getAllSupplyChains();
        setSupplyChains(data);
      } catch (error) {
        // Handle error
      }
    };

    fetchSupplyChains();
  }, []);

  const handleDelete = async (id: number) => {
    try {
      await deleteSupplyChain(id);
      setSupplyChains((prevSupplyChains) => prevSupplyChains.filter((sc) => sc.id !== id));
    } catch (error) {
      // Handle error
    }
  };

  const handleActivate = async (id: number) => {
    try {
      await activateSupplyChain(id);
      setSupplyChains((prevSupplyChains) =>
        prevSupplyChains.map((sc) => (sc.id === id ? { ...sc, status: 'active' } : sc))
      );
    } catch (error) {
      // Handle error
    }
  };

  const handleDeactivate = async (id: number) => {
    try {
      await deactivateSupplyChain(id);
      setSupplyChains((prevSupplyChains) =>
        prevSupplyChains.map((sc) => (sc.id === id ? { ...sc, status: 'inactive' } : sc))
      );
    } catch (error) {
      // Handle error
    }
  };

  return (
    <div>
      {supplyChains.map((supplyChain) => (
        <SupplyChainCard
          key={supplyChain.id}
          supplyChain={supplyChain}
          onDelete={handleDelete}
          onActivate={handleActivate}
          onDeactivate={handleDeactivate}
        />
      ))}
    </div>
  );
};

export default SupplyChainList;
