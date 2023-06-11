import React, { useState, useEffect } from "react";
import { Table, Button, FormControl, Col, Row, Spinner } from "react-bootstrap";
import { User } from "../../types";
import "./../../css/Table.css";
import {
  BsPencilSquare,
  BsTrash,
  BsArrowRepeat,
  BsFillClipboard2Fill,
  BsArrowUp,
  BsArrowDown,
  BsSearch,
} from "react-icons/bs";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";

interface Props {
  users: User[];
  selectedUsers: User[];
  onSelect: (user: User) => void;
  onEdit: (user: User) => void;
  onDelete: (user: User) => void;
  onRestore?: (user: User) => void;
  showRestoreButton?: boolean;
  onSelectAll?: () => void;
}

interface SortConfig {
  column: keyof User;
  order: "asc" | "desc";
}

const UserTable: React.FC<Props> = ({
  users,
  selectedUsers,
  onSelect,
  onEdit,
  onDelete,
  onRestore,
  showRestoreButton = true,
  onSelectAll,
}) => {
  const [filter, setFilter] = useState("");
  const [sortConfig, setSortConfig] = useState<SortConfig>({
    column: "username",
    order: "asc",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const [isLoading, setIsLoading] = useState(true); // Loading state

  useEffect(() => {
    // Simulating delay to demonstrate loading spinner
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const handleCheckboxChange = (user: User) => {
    onSelect(user);
  };

  const handleEditClick = (user: User) => {
    onEdit(user);
  };

  const handleDeleteClick = (user: User) => {
    onDelete(user);
  };

  const handleRestoreClick = (user: User) => {
    onRestore && onRestore(user);
  };

  const handleSelectAllChange = () => {
    if (selectedUsers.length === users.length) {
      // Deselect all users
      selectedUsers.forEach((user) => onSelect(user));
    } else {
      // Select all users
      users.forEach((user) => onSelect(user));
    }
  };

  const formatLastAccess = (lastAccess: string) => {
    if (!lastAccess || lastAccess === "0001-01-01T00:00:00") {
      return "Never";
    }

    const date = new Date(lastAccess);
    return date.toLocaleString();
  };

  const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilter(event.target.value);
  };

  const handleSort = (column: keyof User) => {
    if (sortConfig.column === column) {
      setSortConfig((prevConfig) => ({
        column,
        order: prevConfig.order === "asc" ? "desc" : "asc",
      }));
    } else {
      setSortConfig({
        column,
        order: "asc",
      });
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const filteredUsers = users.filter(
    (user) =>
      user.username.toLowerCase().includes(filter.toLowerCase()) ||
      user.email.toLowerCase().includes(filter.toLowerCase()) ||
      user.role.toLowerCase().includes(filter.toLowerCase())
  );

  const sortedUsers = [...filteredUsers].sort((a, b) => {
    const columnA = a[sortConfig.column]?.toString().toLowerCase() || "";
    const columnB = b[sortConfig.column]?.toString().toLowerCase() || "";

    if (columnA < columnB) {
      return sortConfig.order === "asc" ? -1 : 1;
    } else if (columnA > columnB) {
      return sortConfig.order === "asc" ? 1 : -1;
    } else {
      return 0;
    }
  });

  const pageCount = Math.ceil(sortedUsers.length / itemsPerPage);
  const visibleUsers = sortedUsers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const renderSortIcon = (column: keyof User) => {
    if (sortConfig.column === column) {
      if (sortConfig.order === "asc") {
        return <BsArrowUp />;
      } else {
        return <BsArrowDown />;
      }
    } else {
      return null;
    }
  };

  return (
    <div className="table-container shadow p-3 bg-white rounded">
      {isLoading ? (
        <>
          <Spinner animation="border" role="status"></Spinner>
          <span className="sr-only">Loading...</span>
        </>
      ) : (
        <>
          <Row>
            <Col>
              {/* <label htmlFor="search" className="sr-only">
              Search
            </label> */}
              <div className="pagination-container mt-3">
                <Button
                  variant="secondary"
                  disabled={currentPage === 1}
                  onClick={() => handlePageChange(currentPage - 1)}
                >
                  Previous
                </Button>
                <span className="mx-2">
                  Page {currentPage} of {pageCount}
                </span>
                <Button
                  variant="secondary"
                  disabled={currentPage === pageCount}
                  onClick={() => handlePageChange(currentPage + 1)}
                >
                  Next
                </Button>
              </div>
            </Col>
            <Col>
              <div className="filter-container mb-3">
                <div className="input-group">
                  <FormControl
                    id="search"
                    placeholder="Search"
                    value={filter}
                    onChange={handleFilterChange}
                  />
                  <div className="input-group-prepend">
                    <span className="input-group-text">
                      <BsSearch />
                    </span>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
          <Table className="table">
            <thead>
              <tr>
                <th></th>
                <th onClick={() => handleSort("username")}>
                  Username {renderSortIcon("username")}
                </th>
                <th onClick={() => handleSort("email")}>
                  Email {renderSortIcon("email")}
                </th>
                <th onClick={() => handleSort("role")}>
                  Role {renderSortIcon("role")}
                </th>
                <th>Last Access</th>
                {showRestoreButton ? (
                  <th>Restore</th>
                ) : (
                  <>
                    <th>Actions</th>
                    
                  </>
                )}
                
              </tr>
            </thead>
            <tbody>
              {visibleUsers.map((user) => (
                <tr key={user.id}>
                  <td>
                    <input
                      type="checkbox"
                      checked={selectedUsers.includes(user)}
                      onChange={() => handleCheckboxChange(user)}
                    />
                  </td>
                  <td>{user.username}</td>
                  <td>{user.email}</td>
                  <td>{user.role}</td>
                  <td>{formatLastAccess(user.lastAccess)}</td>
                  {showRestoreButton ? (
                    <td>
                      <Button
                        variant="outline-success"
                        
                        className="btn-purple"
                      >
                        <BsArrowRepeat onClick={() => handleRestoreClick(user)}/>
                      </Button>
                    </td>
                  ) : (
                    <>
                      <td>
                        <FontAwesomeIcon
                          icon={faPen}
                          style={{
                            color: "#482890",
                            cursor: "pointer",
                          }}
                          title="Edit User"
                          onClick={() => handleEditClick(user)}
                        />
                     &nbsp; &nbsp; &nbsp;
                        <FontAwesomeIcon
                          icon={faTrash}
                          style={{
                            color: "#FF615A",
                            cursor: "pointer",
                          }}
                          title="Delete User"
                          onClick={() => handleDeleteClick(user)}
                        />
                      </td>
                    </>
                  )}
                  <td>
                    <Link
                      to={`/users/${user.id}/access-log`}
                      className="btn btn-primary"
                    >
                      <BsFillClipboard2Fill />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </>
      )}
    </div>
  );
};

export default UserTable;
