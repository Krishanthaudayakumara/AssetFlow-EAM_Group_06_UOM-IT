import axios from 'axios';

interface Asset {
  id: number;
  name: string;
  description: string;
  barcode: string;
  stockId: number;
  status: string;
  condition: string;
  warrantyExpiration: string;
  imageUrl: string;
  stock: {
    id: number;
    name: string;
    arrivalDate: string;
    supplierId: number;
    supplierName: string;
    imageUrl: string;
  };
}


interface EditAsset {
    id: number;
    name: string;
    description: string;
    stockId: number;
    status: string;
    condition: string;
    warrantyExpiration: string;
    image: File | null; 

  }


const BASE_URL = 'http://localhost:5087/api/Asset';


const AssetAPI = {
  getAllAssets: () => {
    return axios.get<Asset[]>(BASE_URL);
  },
  updateAsset: (asset: EditAsset) => {
    const formData = new FormData();
    console.log(asset);
   
    formData.append('name', asset.name);
    formData.append('description', asset.description);
    formData.append('stockId', String(asset.stockId));
    formData.append('status', asset.status);
    formData.append('condition', asset.condition);
    formData.append('warrantyExpiration', asset.warrantyExpiration);
    if (asset.image) {
      formData.append('image', asset.image);
    }

    setTimeout(() => {
        console.log(formData);

    }, 5000);
    return axios.put<void>(`${BASE_URL}/${asset.id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },
  deleteAsset: (assetId: number) => {
    return axios.delete<void>(`${BASE_URL}/${assetId}`);
  },
};

export default AssetAPI;
