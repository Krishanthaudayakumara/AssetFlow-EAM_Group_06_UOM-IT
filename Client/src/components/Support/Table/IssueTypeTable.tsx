import { useEffect, useState } from "react";
import axios from "axios";
import { Table} from "react-bootstrap";

interface issueType {
  id: number;
  name: string;
}

const IssueTypeTable = () => {
  const [issues, setIssues] = useState<issueType[]>([]);

  useEffect(() => {
    axios
      .get("http://localhost:5224/Api/IssueType")
      .then((response) => {
        setIssues(response.data);
      })
      .catch((error) => {
        alert(error);
      });
  }, []);

 

  return (
    <div>
      <h2>Issue Information</h2>
      <Table>
        <thead className="table table-dark">
          <tr>
            <th>Issue Id</th>
            <th>Issue</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody className="table table-success">
          {issues.map((issue) => (
            <tr key={issue.id}>
              <td>{issue.id}</td>
              <td>{issue.name}</td>
              
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default IssueTypeTable;
