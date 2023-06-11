import React from "react";
import FacilityAssetTable from "../../components/Facility/FacilityAsset_table";
import FacilityAssetForm from "../../components/Facility/FacilityAssetForm";
import "./../../css/Table.css";

const FacilityAsset: React.FC = () => {
  return (
    <div>
      <h2  className="table-page-heading">FACILITY ASSET</h2>
      
      <FacilityAssetTable />
    </div>
  );
};

export default FacilityAsset;
