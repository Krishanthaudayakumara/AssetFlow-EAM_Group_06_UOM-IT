import { useState, useEffect, Fragment } from "react";
import { Container, Row, Col, Nav, Table } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "../Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

function SubCategoryTable() {
  const [subCategoryProduct, setSubCategoryProduct] = useState<any[]>([]);

  useEffect(() => {
    fetchSubCategories();
  }, []);

  const fetchSubCategories = async () => {
    try {
      const response = await axios.get("http://localhost:5050/api/SubCategory");
      setSubCategoryProduct(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = async (subCategoryId: number) => {
    // Get the subcategory to edit
    const subCategoryToEdit = subCategoryProduct.find(
      (subCategory) => subCategory.id === subCategoryId
    );

    // Show a prompt to get the updated values
    const updatedSubCategoryType = prompt(
      "Enter updated subcategory type:",
      subCategoryToEdit?.subCategoryType
    );
    const updatedCategoryId = prompt(
      "Enter updated categoryid:",
      subCategoryToEdit?.categoryId
    );

    // Make the PUT request to update the subcategory
    try {
      const response = await axios.put(
        `http://localhost:5050/api/SubCategory/${subCategoryId}`,
        {
          subCategoryType: updatedSubCategoryType,
          categoryId: updatedCategoryId,
        }
      );
      console.log(response);
      fetchSubCategories(); // update the subcategories list
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (subCategoryId: number) => {
   
   
    try {
      const response = await axios.delete(
        `http://localhost:5050/api/SubCategory/${subCategoryId}`
      );
      console.log(response);
      fetchSubCategories(); // update the subcategories list
    } catch (error) {
      console.log(error);
    }
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
                  <th>ID</th>
                  <th>Sub_Category_type</th>
                  <th>Category_id</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {subCategoryProduct && subCategoryProduct.length > 0 ? (
                  subCategoryProduct.map((subCategory) => {
                    return (
                      <tr key={subCategory.id}>
                        <td>{subCategory.id}</td>
                        <td className="text-secondary">
                          {subCategory.subCategoryType}
                        </td>
                        <td className="text-secondary">
                          {subCategory.categoryId}
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
    </div>
  );
}

export default SubCategoryTable;
