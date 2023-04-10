import { useState, useEffect, Fragment } from "react";
import { Container, Row, Col, Nav, Table } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "../Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

function CategoryTable() {
  const [categoryProduct, setCategoryProduct] = useState<any[]>([]);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get("http://localhost:5050/api/Category");
      setCategoryProduct(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = async (categoryId: number) => {
    // Get the category to edit
    const categoryToEdit = categoryProduct.find(
      (category) => category.id === categoryId
    );

    // Show a prompt to get the updated values
    const updatedCategoryType = prompt(
      "Enter updated category type:",
      categoryToEdit?.categoryType
    );
    const updatedDescription = prompt(
      "Enter updated description:",
      categoryToEdit?.description
    );
     
    // Make the PUT request to update the category
    try {
      const response = await axios.put(
        `http://localhost:5050/api/Category/${categoryId}`,
        {
          categoryType: updatedCategoryType,
          description: updatedDescription,
        }
      );
      console.log(response);
      fetchCategories(); // update the categories list
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (categoryId: number) => {
    // Check if the category ID exists in the categoryProduct state
    const categoryToDelete = categoryProduct.find(
      (category) => category.id === categoryId
    );
    if (!categoryToDelete) {
      console.log(`Category ID ${categoryId} does not exist`);
      return;
    }

    try {
      const response = await axios.delete(
        `http://localhost:5050/api/Category/${categoryId}`
      );
      console.log(response);
      fetchCategories(); // update the categories list
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
        Latest Categories
      </p>
      <div
        className="shadow p-3 bg-white rounded"
        style={{ margin: "30px 0 0 65px" }}
      >
        <Fragment>
          <div>
            <Table
              className="table w-100 small table-borderless table-responsiv align-middle align-left"
              hover
              style={{ fontSize: "14px" }}
            >
              <thead className="thead-light">
                <tr style={{ color: "#482890" }}>
                  <th>ID</th>
                  <th>Category_type</th>
                  <th>Description</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {categoryProduct && categoryProduct.length > 0 ? (
                  categoryProduct.map((category) => {
                    return (
                      <tr key={category.id}>
                        <td>{category.id}</td>
                        <td className="text-secondary">
                          {category.categoryType}
                        </td>
                        <td className="text-secondary">
                          {category.description}
                        </td>
                        <td>
                        <FontAwesomeIcon
                            icon={faPen}
                            style={{ color: "482890", cursor: "pointer" }}
                            onClick={() => handleEdit(category.id)}
                          />
                          &nbsp; &nbsp; &nbsp;
                          <FontAwesomeIcon
                            icon={faTrash}
                            style={{ color: "#FF615A", cursor: "pointer" }}
                            onClick={() => handleDelete(category.id)}
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

export default CategoryTable;
