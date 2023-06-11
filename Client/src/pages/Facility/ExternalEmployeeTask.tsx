import React from "react";
import TaskTable from "../../components/Facility/TaskTable";

const ExternalEmployeeTask: React.FC = () => {
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
        Cleaning Tasks
      </h3>
            <TaskTable/>
        </div>
    );

}

export default ExternalEmployeeTask;


