import React from "react";
import FacilityAssetStock from "../../components/Facility/FacilityAssetStock_table";

const FacilityStock: React.FC = () => {
    return (
      <div>
        <h3
         style={{
            color: "purple",
            marginLeft: 120,
            paddingTop: 40,
            fontWeight: "bold",
          }}
        
        > Facility Stock</h3>
       
       <FacilityAssetStock/> 
        
      </div>
      
    );
  };
  
  export default FacilityStock;

