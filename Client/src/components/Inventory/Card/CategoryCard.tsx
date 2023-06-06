import { useState, useEffect, Fragment } from "react";
import { Container, Row, Col, Nav, Table } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "../Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import "../Card/CategoryCard.css";






function CategoryTable() {
  const [categoryProduct, setCategoryProduct] = useState<any[]>([]);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get("http://localhost:5087/api/Category");
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
        `http://localhost:5087/api/Category/${categoryId}`,
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
        `http://localhost:5087/api/Category/${categoryId}`
      );
      console.log(response);
      fetchCategories(); // update the categories list
    } catch (error) {
      console.log(error);
    }
  };


  return (
  

    <div className="flip-card">
    <div className="flip-card-inner">
      <div className="flip-card-front">
        <img src="/img/Electronics.png" alt="Electronics" className="img"></img>
      </div>
      <div className="flip-card-back">
      {categoryProduct && categoryProduct.length > 0 ? (
                  categoryProduct.map((category) => {
                    return (
                        <div  key={category.id}>
                          <h1> {category.categoryType}</h1>
                        </div>
                   
                    );
                  })
                ) : (
                  <div>
                    <td colSpan={4}>No data available</td>
                  </div>
                )}
      </div>
    </div>
  </div>

  );
}

export default CategoryTable;
