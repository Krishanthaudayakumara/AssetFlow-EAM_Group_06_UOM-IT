import { useState, useEffect, Fragment, ChangeEvent } from "react";
import { Container, Row, Col, Nav, Table } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "../Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import "../Table/AssetTable.css";
import { colors } from "react-select/dist/declarations/src/theme";

function AssetTable() {
  const [assetProduct, setAssetProduct] = useState<any[]>([]);

  useEffect(() => {
    fetchAssets();
  }, []);

  const fetchAssets = async () => {
    try {
      const response = await axios.get("http://localhost:5087/api/Asset");
      setAssetProduct(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = async (assetId: number) => {
    // Get the category to edit
    const assetToEdit = assetProduct.find(
      (asset) => asset.id === assetId
    );

    // Show a prompt to get the updated values
    const updatedAssetId = prompt(
      "Enter updated Assetid:",
       assetToEdit?.id
    );
    const updatedDescription = prompt(
      "Enter updated description:",
       assetToEdit?.description
    );

    const updatedVendor = prompt(
        "Enter updated vendor:",
        assetToEdit?.vendor
      );

      const updatedStatus = prompt(
        "Enter updated status:",
        assetToEdit?.status
      );

      const updatedCondition = prompt(
        "Enter updated condition:",
        assetToEdit?.condition
      );

      const updatedWarrantyExpiration = prompt(
        "Enter updated WarrantyExpiration:",
        assetToEdit?.WarrantyExpiration
      );
     
      const updatedStockId = prompt(
        "Enter updated stockid:",
        assetToEdit?.stockId
      );

      const updatedBarcodeImageBase64 = prompt(
        "Enter updated barcodeImageBase6:",
        assetToEdit?.barcodeImageBase6
      );

    // Make the PUT request to update the category
    try {
      const response = await axios.put(
        `http://localhost:5087/api/Asset/${assetId}`,
        {
          

            id: updatedAssetId,
            description: updatedDescription,
            vendor: updatedVendor,
            status: updatedStatus,
            condition: updatedCondition,
            warrantyExpiration: updatedWarrantyExpiration,
            stockId: updatedStockId,
            barcodeImageBase64: updatedBarcodeImageBase64,
        }
      );
      console.log(response);
      fetchAssets(); // update the categories list
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (assetId: number) => {
    // Check if the category ID exists in the categoryProduct state
    const assetToDelete = assetProduct.find(
      (asset) => asset.id === assetId
    );
    if (!assetToDelete) {
      console.log(`Asset ID ${assetId} does not exist`);
      return;
    }

    try {
      const response = await axios.delete(
        `http://localhost:5087/api/Asset/${assetId}`
      );
      console.log(response);
      fetchAssets(); // update the categories list
    } catch (error) {
      console.log(error);
    }
};


const downloadBarcode = (assetId: any) => {
  const link = document.createElement("a");
  link.href = `http://localhost:5087/api/Asset/${assetId}/barcode`;
  link.download = `barcode_${assetId}.png`;
  link.click();
};

return (
  <div>
    <p
      style={{
        margin: "30px 0 30px 0px",
        color: "#482890",
        fontSize: "18px",
        fontWeight: "bold",
      }}
    >
      Latest Assets
    </p>
    <div
      className="shadow p-3 bg-white rounded"
      style={{ margin: "30px 0 0 0" }}
    >
      <Fragment>
        <div>
          <Table
            className="table w-100 small table-borderless table-responsive align-middle align-left"
            hover
            style={{ fontSize: "14px" }}
          >
            <thead className="thead-light">
              <tr style={{ color: "#482890" }}>
                <th>ID</th>
                <th>description</th>
                <th>vendor</th>
                <th>status</th>
                <th>condition</th>
                <th>warrantyExpiration</th>
                <th>stockId</th>
                <th>Barcode</th>
              </tr>
            </thead>
            <tbody>
              {assetProduct && assetProduct.length > 0 ? (
                assetProduct.map((asset) => {
                  return (
                    <tr key={asset.id}>
                      <td>{asset.id}</td>
                      <td className="text-secondary">
                        {asset.description}
                      </td>
                      <td className="text-secondary">
                        {asset.vendor}
                      </td>
                      <td className="text-secondary">
                        {asset.status}
                      </td>
                      <td className="text-secondary">
                        {asset.condition}
                      </td>
                      <td className="text-secondary">
                        {asset.warrantyExpiration}
                      </td>
                      <td className="text-secondary">
                        {asset.stockId}
                      </td>
                        <td>
                  <img className="imgA" src={`data:image/png;base64,${asset.barcodeImageBase64}`} alt="Barcode" />
                </td>

                      
                      <td>
                        <FontAwesomeIcon
                          icon={faPen}
                          style={{ color: "482890", cursor: "pointer" }}
                          onClick={() => handleEdit(asset.id)}
                        />
                       </td>
                       <td>
                        <FontAwesomeIcon
                          icon={faTrash}
                          style={{ color: "#FF615A", cursor: "pointer" }}
                          onClick={() => handleDelete(asset.id)}
                        />
                      </td>

                      <td>
                     <Button onClick={() => downloadBarcode(asset.id)}>
                     <img
                        src="/img/download.gif"
                        alt="Download barcode"
                        width="20"
                        height="20"
                      />
                     </Button>
                </td>

                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={4}>No data available</td>
                </tr>
              )}
            </tbody>
          </Table>
        </div>
      </Fragment>
    </div>
  </div>
);
}

export default AssetTable;