import { Fragment, useEffect, useState } from "react";
import axios from "axios";
import { Table, Modal, Button, Form, InputGroup } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrash, faSearch } from "@fortawesome/free-solid-svg-icons";
import "../../../css/Support/Support.css";
import DefaultProfilePicture from "../DefaultProfilePicture";
import DeleteConfirmation from "../ConfirmMessages/DeleteConfirmation";
import { FaSearch } from "react-icons/fa";

interface issueType {
  id: number;
  name: string;
}

const IssueTypeTable = () => {
  const [issues, setIssues] = useState<issueType[]>([]);
  const [selectedIssue, setSelectedIssue] = useState<issueType | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deletingIssue, setDeletingIssue] = useState<issueType | null>(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:5087/Api/IssueType")
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
        `http://localhost:5087/Api/IssueType/${selectedIssue?.id}`,
        selectedIssue
      )
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
  const handleDeleteIssue = (issue: issueType) => {
    setDeletingIssue(issue);
    setShowDeleteModal(true);
  };
  const confirmDeleteIssue = () => {
    axios
      .delete(`http://localhost:5087/Api/IssueType/${deletingIssue?.id}`)
      .then((response) => {
        setIssues(issues.filter((item) => item.id !== deletingIssue?.id));
      })
      .catch((error) => {})
      .finally(() => {
        setDeletingIssue(null);
        setShowDeleteModal(false);
      });
  };

  return (
    <div>
      <div className="row">
        <div className="col-8">
          <p className="table-heading">Issue Types</p>
        </div>
        <div className="col-1">
          <Form>
            <InputGroup style={{ width: '300px' }}>
              <Form.Control
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search Issue Types"
              />
              <InputGroup.Text>
                <FaSearch />
              </InputGroup.Text>
            </InputGroup>
          </Form>
        </div>
      </div>
      <div className="box-shadow">
        <Fragment>
          <div>
            <Table className="support-table">
              <thead>
                <tr style={{ color: "#482890" }}>
                  <th></th>
                  <th>Issue Type</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {issues
                  .filter((issue) => {
                    return search.toLowerCase() === ""
                      ? issue
                      : issue.name.toLowerCase().includes(search);
                  })
                  .map((issue) => (
                    <tr key={issue.id}>
                      <td>{DefaultProfilePicture({ name: issue.name })}</td>
                      <td>{issue.name}</td>
                      <td>
                        <FontAwesomeIcon
                          icon={faPen}
                          style={{
                            color: "#482890",
                            cursor: "pointer",
                          }}
                          onClick={() => handleEditIssueClick(issue)}
                        />
                        &nbsp; &nbsp; &nbsp;
                        <FontAwesomeIcon
                          icon={faTrash}
                          style={{
                            color: "#FF615A",
                            cursor: "pointer",
                          }}
                          onClick={() => handleDeleteIssue(issue)}
                        />
                      </td>
                    </tr>
                  ))}
              </tbody>
            </Table>
          </div>
        </Fragment>
      </div>
      <Modal show={showModal} onHide={handleModalClose}>
        <Modal.Header style={{ backgroundColor: "#482890" }}>
          <Modal.Title style={{ color: "white" }}>Edit Issue Type</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedIssue && (
            <Form>
              <Form.Group controlId="formIssueName">
                <Form.Label>Issue</Form.Label>
                <Form.Control
                  type="text"
                  value={selectedIssue.name}
                  onChange={(e) =>
                    setSelectedIssue({
                      ...selectedIssue,
                      name: e.target.value,
                    })
                  }
                />
              </Form.Group>
            </Form>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleModalClose}>
            Close
          </Button>
          <Button variant="primary" onClick={() => handleUpdateIssue()}>
            Update Issue
          </Button>
        </Modal.Footer>
      </Modal>
      <DeleteConfirmation
        show={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={confirmDeleteIssue}
        deletingIssueName={deletingIssue?.name || ""}
      />
    </div>
  );
};

export default IssueTypeTable;
