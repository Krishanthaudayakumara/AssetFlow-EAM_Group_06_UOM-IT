import React from "react";
import AssigningCleaningStaff from "../../components/Facility/AssigningCleaningStaff";

const CleaningStaff: React.FC = () => {
    return(
        <div>
            <h3
        style={{
          color: "purple",
          marginLeft: 120,
          paddingTop: 40,
          fontWeight: "bold",
        }}
      >
        Cleaning staff
      </h3>
            < AssigningCleaningStaff/>
        </div>
    );

}

export default CleaningStaff;

