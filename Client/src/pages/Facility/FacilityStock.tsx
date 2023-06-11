import React from "react";
import FacilityAssetStock from "../../components/Facility/FacilityAssetStock_table";
import "./../../css/Table.css";

const FacilityStock: React.FC = () => {
  return (
    <div>
      <h2 className="table-page-heading">FACILITY STOCK</h2>

      <FacilityAssetStock />
    </div>
  );
};

export default FacilityStock;
