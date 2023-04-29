import "bootstrap/dist/css/bootstrap.min.css";
import { Fragment, useEffect, useState } from "react";
import axios from "axios";
import { Table, Form, InputGroup, Pagination } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import "../../../css/Support/Support.css";
import DefaultProfilePicture from "../DefaultProfilePicture";
import DeleteConfirmation from "../ConfirmMessages/DeleteConfirmation";
import { FaSearch } from "react-icons/fa";
import EditIssueTypeForm from "../Forms/EditIssueTypeForm";
import UpdateConfirmation from "../ConfirmMessages/UpdateConfirmation";

interface issueType {
  id: number;
  name: string;
}

const IssueTypeTable = () => {
  const [issues, setIssues] = useState<issueType[]>([]);
  const [selectedIssue, setSelectedIssue] = useState<issueType | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deletingIssue, setDeletingIssue] = useState<issueType | null>(null);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const recordsPerPage = 4;

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
        setShowUpdateModal(true);
        setTimeout(() => {
          setShowUpdateModal(false);
        }, 2000);
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
      .catch((error) => {
        if (error.response && error.response.status === 409) {
          // Display the error message
          alert(error.response.data);
        } else {
          // Handle other errors
        }
      })
      .finally(() => {
        setDeletingIssue(null);
        setShowDeleteModal(false);
      });
  };
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div>
      <div className="row">
        <div className="col-8">
          <p className="table-heading">Issue Types</p>
        </div>
        <div className="col-1">
          <Form>
            <InputGroup style={{ width: "300px" }}>
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
                  .slice(
                    (currentPage - 1) * recordsPerPage,
                    currentPage * recordsPerPage
                  )
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
      <EditIssueTypeForm
        show={showModal}
        onClose={handleModalClose}
        onUpdate={handleUpdateIssue}
        selectedIssue={selectedIssue}
        setSelectedIssue={setSelectedIssue}
      />
      <UpdateConfirmation
        show={showUpdateModal}
        onClose={() => setShowUpdateModal(false)}
        updatedIssueName={selectedIssue?.name || ""}
      />
      <DeleteConfirmation
        show={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={confirmDeleteIssue}
        deletingIssueName={deletingIssue?.name || ""}
      />
      <div className="pagination-wrapper">
        <Pagination className="custom-pagination">
          {Array.from(
            { length: Math.ceil(issues.length / recordsPerPage) },
            (_, index) => {
              const pageNumber = index + 1;
              return (
                <Pagination.Item
                  key={pageNumber}
                  active={pageNumber === currentPage}
                  onClick={() => handlePageChange(pageNumber)}
                >
                  {pageNumber}
                </Pagination.Item>
              );
            }
          )}
        </Pagination>
      </div>
    </div>
  );
};

export default IssueTypeTable;
