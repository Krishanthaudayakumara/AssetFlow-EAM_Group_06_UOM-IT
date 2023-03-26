import { Fragment, useEffect, useState } from "react";
import axios from "axios";
import { Table} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons/faPen";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
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
      <p style={{margin: "0 0 30px 70px",color: "#482890",fontSize: "18px",fontWeight: "bold",}}>Issue Types</p>
      <div className="shadow p-3 bg-white rounded" style={{ margin: "30px 0 0 65px" }}>
      <Fragment>
      <div>
        <Table className="table w-100 small table-borderless table-responsiv align-middle align-left" hover style={{ fontSize: "14px" }}>
        <thead>
                <tr style={{ color: "#482890" }}>                  
                  <th>Issue Type ID</th>
                  <th>Issue</th>
                  <th>Action</th>                  
                </tr>
              </thead>
              <tbody>
              {issues.map((issue) => (
            <tr key={issue.id}>
              <td className="text-secondary">{issue.id}</td>
              <td className="text-secondary">{issue.name}</td>
              <td> <FontAwesomeIcon icon={faPen} style={{ color: "#482890" }}/> &nbsp; &nbsp; &nbsp;<FontAwesomeIcon  icon={faTrash} style={{ color: "#FF615A" }}/> </td>              
            </tr>
          ))}
              </tbody>
        </Table>
      </div>
      </Fragment>
      </div>     
    </div>
  );
};

export default IssueTypeTable;
