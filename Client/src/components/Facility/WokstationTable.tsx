import React from "react";
import { Table } from "react-bootstrap";

function WorkstationTable(){
    return(
        <div style={{ margin: "5rem" }}>
            <div  className="shadow p-2 mb- bg-white rounded"
        style={{ width: "800px" }}>
               
            </div>
            <Table   className="table w-100 small text-center"
          hover
          align="center"
          style={{ fontSize: "14px", width: "500px" }}>
              <thead>
            <tr style={{ color: "#482890" }}>
              
              <th>Description</th>
              <th colSpan={1}>Vendor</th>
              <th>SubCategory Id</th>
              <th>Category Id</th>
              <th>Asset Id</th>
            </tr>
          </thead>

            </Table>
        </div>    
    );
    
}
export default WorkstationTable;




    









