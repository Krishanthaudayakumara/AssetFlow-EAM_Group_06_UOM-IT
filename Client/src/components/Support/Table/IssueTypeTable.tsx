import { Fragment, useEffect, useState } from "react";
import axios from "axios";
import { Table, Modal, Button, Form } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
interface issueType {
  id: number;
  name: string;}

const IssueTypeTable = () => {
  const [issues, setIssues] = useState<issueType[]>([]);
  const [selectedIssue, setSelectedIssue] = useState<issueType | null>(null);
  const [showModal, setShowModal] = useState(false);

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

  const handleUpdateIssue = () => {
    axios
      .put(
        `http://localhost:5224/Api/IssueType/${selectedIssue?.id}`, selectedIssue )
      .then((response) => {
        setIssues(
          issues.map((issue) =>
            issue.id === selectedIssue?.id ? selectedIssue : issue
          )
        );
        setShowModal(false);
        alert("Successfully updated!");
      })
      .catch((error) => {
        alert("Not updated!");
      });
  };

  const handleEditIssueClick = (issue: issueType) => {
    setSelectedIssue(issue);
    setShowModal(true);
  };

  const handleModalClose = () => {
    setSelectedIssue(null);
    setShowModal(false);
  };

  return (
    <div>
      <p
        style={{ margin: "0 0 30px 70px", color: "#482890",  fontSize: "18px", fontWeight: "bold", }} > Issue Types </p>
      <div className="shadow p-3 bg-white rounded"  style={{ margin: "30px 0 0 65px" }} >
        <Fragment>
          <div>
            <Table  className="table w-100 small table-borderless table-responsiv align-middle align-left"  hover style={{ fontSize: "14px" }} >
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
                    <td>
                      <FontAwesomeIcon  icon={faPen} style={{ color: "#482890", cursor: "pointer" }} onClick={() => handleEditIssueClick(issue)} />
                      &nbsp; &nbsp; &nbsp;
                      <FontAwesomeIcon  icon={faTrash} style={{ color: "#FF615A", cursor: "pointer" }} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </Fragment>
      </div>
      <Modal show={showModal} onHide={handleModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Issue</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedIssue && (
            <Form>
              <Form.Group controlId="formIssueNam">
                <Form.Label>Issue</Form.Label>
                <Form.Control type="text"  value={selectedIssue.name} onChange={(e) => setSelectedIssue({ ...selectedIssue, name: e.target.value,})} />
              </Form.Group>
            </Form>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleModalClose}> Close </Button>
          <Button variant="primary" onClick={() => handleUpdateIssue()}> Update Issue </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );};
export default IssueTypeTable;
