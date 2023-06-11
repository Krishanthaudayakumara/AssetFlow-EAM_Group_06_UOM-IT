import React from "react";
import FacilityAssetTable from "../../components/Facility/FacilityAsset_table";


const FacilityAsset: React.FC = () => {
    return (
      <div>
        <h3
        style={{
          color: "purple",
          marginLeft: 120,
          paddingTop: 40,
          fontWeight: "bold",
        }}
      >
        Facility Asset
      </h3>
       
        < FacilityAssetTable/>
           
      </div>
      
      
      
    );
  };
  
  export default FacilityAsset;
  



