import axios from "axios";
import { useEffect, useState } from "react";
import { Table } from "react-bootstrap";

interface issueType {
  Id: number;
  Name: string;
}

function AddIssueType() {
  const [issueTypes, setIssueTypes] = useState<issueType[]>([]);

  useEffect(() => {
    axios
      .get("http://localhost:5224/Api/IssueType")
      .then((response) => {
        setIssueTypes(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div>
      <Table className="table w-100 small table-borderless table-responsiv align-middle align-left" hover style={{ fontSize: "14px" }}>
        <thead>
          <tr >
            
            <th>Issue Id</th>
            <th>Issue Name</th>
          </tr>
        </thead>
        <tbody>
          {
            issueTypes.map((issue) => (
              <tr key={issue.Id}>
                <td>{issue.Id}</td>
                <td>{issue.Name}</td>
              </tr>
            ))
          }
        </tbody>
      </Table>
    </div>
  );
}

export default AddIssueType;
