import "bootstrap/dist/css/bootstrap.min.css";
import { Fragment, useEffect, useState } from "react";
import axios from "axios";
import { Table, Form, InputGroup, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import "../../../css/Support/Support.css";
import DefaultProfilePicture from "../DefaultProfilePicture";
import DeleteConfirmation from "../ConfirmMessages/DeleteConfirmation";
import { FaSearch } from "react-icons/fa";
import EditIssueTypeForm from "../Forms/IssueType/EditIssueTypeForm";
import UpdateConfirmation from "../ConfirmMessages/UpdateConfirmation";
import DeleteError from "../ConfirmMessages/DeleteError";
import PaginationComponent from "../pagination";
import IssueTypeCardView from "../Card/IssueTypeCardView";

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
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [cardViewActive, setCardViewActive] = useState(false);

  const recordsPerPage = 6;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5087/Api/IssueType");
        setIssues(response.data);
      } catch (error) {
        alert(error);
      }
    };

    fetchData();
  }, []);

  const handleEditIssueClick = (issue: issueType) => {
    setSelectedIssue(issue);
    setShowModal(true);
  };

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
      })
      .catch((error) => {
        // Handle other errors
      });
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
          setErrorMessage(error.response.data);
        } else {
          // Handle other errors
        }
      })
      .finally(() => {
        setDeletingIssue(null);
        setShowDeleteModal(false);
      });
  };

  const resetErrorMessage = () => {
    setErrorMessage(null);
  };

  const totalPages = Math.ceil(issues.length / recordsPerPage);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };
  const handleCardViewClick = () => {
    setCardViewActive(!cardViewActive);
  };

  return (
    <div>
      <div className="row">
        <div className="col-6">
         
        </div>
        <div className="col-2">
          <Button onClick={handleCardViewClick}>
            {cardViewActive ? "Table View" : "Card View"}
          </Button>
        </div>
        <div className="col-1">
          <Form>
            <InputGroup style={{ width: "300px" }}>
              <Form.Control
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search Issue Type"
              />
              <InputGroup.Text>
                <FaSearch />
              </InputGroup.Text>
            </InputGroup>
          </Form>
        </div>
      </div>
      <DeleteError
        errorMessage={errorMessage}
        onResetError={resetErrorMessage}
      />
      {cardViewActive ? (
        <IssueTypeCardView
          issues={issues}
          search={search}
          currentPage={currentPage}
          recordsPerPage={recordsPerPage}
          onEditIssue={handleEditIssueClick}
          onDeleteIssue={handleDeleteIssue}
        />
      ) : (
        <div className="box-shadow">
          <Fragment>
            <div>
              <Table className="support-table">
                <thead>
                  <tr style={{ color: "#482890" }}>
                    <th style={{ width: "60px" }}></th>
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
                            title="Edit Issue Type"
                            onClick={() => handleEditIssueClick(issue)}
                          />
                          &nbsp; &nbsp; &nbsp;
                          <FontAwesomeIcon
                            icon={faTrash}
                            style={{
                              color: "#FF615A",
                              cursor: "pointer",
                            }}
                            title="Delete Issue Type"
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
      )}

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
        updatedName={selectedIssue?.name || ""}
      />
      <DeleteConfirmation
        show={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={confirmDeleteIssue}
        deletingIssueName={deletingIssue?.name || ""}
      />
      <div className="pagination-wrapper">
        <PaginationComponent
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
};
export default IssueTypeTable;
