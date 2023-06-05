import { useState, useEffect, Fragment } from "react";
import { Container, Row, Col, Nav, Table, Modal, Button, Form, Alert } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

function SubCategoryTable() {
  const [subCategoryProduct, setSubCategoryProduct] = useState<any[]>([]);
  const [editModalShow, setEditModalShow] = useState(false);
  const [editSubCategoryId, setEditSubCategoryId] = useState<number | null>(null);
  const [updatedSubCategoryType, setUpdatedSubCategoryType] = useState("");
  const [updatedCategoryId, setUpdatedCategoryId] = useState("");
  const [validationError, setValidationError] = useState("");
  const [deleteModalShow, setDeleteModalShow] = useState(false);
  const [deleteSubCategoryId, setDeleteSubCategoryId] = useState<number | null>(null);

  useEffect(() => {
    fetchSubCategories();
  }, []);

  const fetchSubCategories = async () => {
    try {
      const response = await axios.get("http://localhost:5087/api/SubCategory");
      setSubCategoryProduct(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = (subCategoryId: number) => {
    // Get the subcategory to edit
    const subCategoryToEdit = subCategoryProduct.find(
      (subCategory) => subCategory.id === subCategoryId
    );

    // Set the values for the modal inputs
    setUpdatedSubCategoryType(subCategoryToEdit?.subCategoryType || "");
    setUpdatedCategoryId(subCategoryToEdit?.categoryType || "");

    // Show the edit modal
    setEditSubCategoryId(subCategoryId);
    setEditModalShow(true);
  };

  const handleSaveEdit = async () => {
    // Validate the inputs
    if (!updatedSubCategoryType || !updatedCategoryId || updatedCategoryId == "Choose a category ...") {
      setValidationError("Please fill in all required fields.");
      return;
    }

    // Make the PUT request to update the subcategory
    try {
      const response = await axios.put(
        `http://localhost:5087/api/SubCategory/${editSubCategoryId}`,
        {
          subCategoryType: updatedSubCategoryType,
          categoryType: updatedCategoryId,
        }
      );
      console.log(response);
      fetchSubCategories(); // update the subcategories list
      setValidationError(""); // clear the validation error
      setEditModalShow(false); // close the edit modal
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = (subCategoryId: number) => {
    // Show the delete confirmation modal
    setDeleteSubCategoryId(subCategoryId);
    setDeleteModalShow(true);
  };

  const confirmDelete = async () => {
    try {
      const response = await axios.delete(
        `http://localhost:5087/api/SubCategory/${deleteSubCategoryId}`
      );
      console.log(response);
      fetchSubCategories(); // update the subcategories list
      setDeleteModalShow(false); // close the delete modal
    } catch (error) {
      console.log(error);
    }
  };

  const [categoryProduct, setCategoryProduct] = useState<any[]>([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>("");

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const categoryProduct = await axios.get("http://localhost:5087/api/Category");
      console.log(categoryProduct);
      setCategoryProduct(categoryProduct.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCategoryIdChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedCategoryId(event.target.value);
  };

  return (
    <div>
      <p
        style={{
          margin: "30px 0 30px 70px",
          color: "#482890",
          fontSize: "18px",
          fontWeight: "bold",
        }}
      >
        Latest SubCategories
      </p>
      <div
        className="shadow p-3 bg-white rounded"
        style={{ margin: "30px 0 0 65px" }}
      >
        <Fragment>
          <div>
            <Table
              className="table w-100 small table-borderless table-responsive align-middle align-left"
              hover
              style={{ fontSize: "14px" }}
            >
              <thead className="thead-light">
                <tr style={{ color: "#482890" }}>
                  {/* <th>ID</th> */}
                  <th>SubCategory(Name)</th>
                  <th>Category</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {subCategoryProduct && subCategoryProduct.length > 0 ? (
                  subCategoryProduct.map((subCategory) => {
                    return (
                      <tr key={subCategory.id}>
                        {/* <td>{subCategory.id}</td> */}
                        <td className="text-secondary">
                          {subCategory.subCategoryType}
                        </td>
                        <td className="text-secondary">
                          {subCategory.categoryType}
                        </td>
                        <td>
                          <FontAwesomeIcon
                            icon={faPen}
                            style={{ color: "482890", cursor: "pointer" }}
                            onClick={() => handleEdit(subCategory.id)}
                          />
                          &nbsp; &nbsp; &nbsp;
                          <FontAwesomeIcon
                            icon={faTrash}
                            style={{ color: "#FF615A", cursor: "pointer" }}
                            onClick={() => handleDelete(subCategory.id)}
                          />
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan={4}>No data available</td>
                  </tr>
                )}
              </tbody>
            </Table>
          </div>
        </Fragment>
      </div>

      <Modal show={editModalShow} onHide={() => setEditModalShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Subcategory</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {validationError && (
            <Alert variant="danger">{validationError}</Alert>
          )}
          <Form.Group>
            <Form.Label>Subcategory Type:</Form.Label>
            <Form.Control
              type="text"
              value={updatedSubCategoryType}
              onChange={(e) => setUpdatedSubCategoryType(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Category:</Form.Label>
            <Form.Control
              as="select"
              value={updatedCategoryId}
              onChange={(e) => setUpdatedCategoryId(e.target.value)}
              required
            >
              <option value="">Choose a category ...</option>
              {categoryProduct.map((category) => (
                <option key={category.categoryType} value={category.categoryType}>{category.categoryType}</option>
              ))}
            </Form.Control>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setEditModalShow(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSaveEdit}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={deleteModalShow} onHide={() => setDeleteModalShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Subcategory</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Are you sure you want to delete this subcategory?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setDeleteModalShow(false)}>
            Close
          </Button>
          <Button variant="danger" onClick={confirmDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default SubCategoryTable;
