import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import AssetTable from '../../../components/Inventory/Asset/AssetTable';
import AssetEditModal from '../../../components/Inventory/Asset/AssetEditModal';
import AssetDeleteModal from '../../../components/Inventory/Asset/AssetDeleteModal';
import AssetAPI from '../../../api/assetApi';
import { Asset, EditAsset, DeleteAsset } from '../../../types';
import "../../../css/Table.css";

const AssetPage = () => {
  const [assets, setAssets] = useState<Asset[]>([]);
  const [selectedAsset, setSelectedAsset] = useState<EditAsset | null>(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  useEffect(() => {
    loadAssets();
  }, []);

  const loadAssets = async () => {
    try {
      const response = await AssetAPI.getAllAssets();
      setAssets(response.data);
    } catch (error) {
      console.error('Error loading assets:', error);
    }
  };

  const handleEditAsset = (asset: Asset) => {
    setSelectedAsset(asset as unknown as EditAsset);
    setShowEditModal(true);
  };

  const handleDeleteAsset = (asset: Asset) => {
    setSelectedAsset(asset as unknown as EditAsset);
    setShowDeleteModal(true);
  };

  const handleAssetUpdate = (assetData: EditAsset) => {
    console.log('Asset data:', assetData);
    try {
      AssetAPI.updateAsset(assetData);
      loadAssets();
      handleCloseModals();
    } catch (error) {
      console.error('Error updating asset:', error);
    }
  };

  const handleAssetDelete = async (asset: DeleteAsset) => {
    try {
      if (asset) {
        await AssetAPI.deleteAsset(asset.id);
        loadAssets();
        handleCloseModals();
      }
    } catch (error) {
      console.error('Error deleting asset:', error);
    }
  };

  const handleCloseModals = () => {
    setShowEditModal(false);
    setShowDeleteModal(false);
    setSelectedAsset(null);
  };

  return (
    <Container>
      <h2 className="table-page-heading">INVENTORY</h2>
      <AssetTable
        assets={assets}
        onEdit={handleEditAsset}
        onDelete={handleDeleteAsset}
      />
      <AssetEditModal
        show={showEditModal}
        asset={selectedAsset}
        onUpdate={handleAssetUpdate}
        onClose={handleCloseModals}
      />
      <AssetDeleteModal
        show={showDeleteModal}
        asset={selectedAsset}
        onDelete={handleAssetDelete}
        onClose={handleCloseModals}
      />
    </Container>
  );
};

export default AssetPage;
