import { useState, useEffect, Fragment, ChangeEvent } from "react";
import { Container, Row, Col, Nav, Table } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "../Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import "../Table/CategoryTable.css";
import { colors } from "react-select/dist/declarations/src/theme";

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
        className="shadow p-3 rounded"
        style={{ margin: "30px 0 0 65px",
                  backgroundColor: "#Fbf3F3"}}
      >
        <td>
          <div>
          
              
           
                {categoryProduct && categoryProduct.length > 0 ? (
                  categoryProduct.map((category) => {
                    return (
                   
                      <div className="flip-card">
                      <div className="flip-card-inner">
                        <div className="flip-card-front">

                       <p> {category.categoryType}</p>
                     
                       {category.imageData && (
                            <img className="img"
                              src={`data:${category.imageContentType};base64,${category.imageData}`}
                              alt="Category Image"
                            />
                          )}
                      
    
                      </div>

                        <div className="flip-card-back">

                      <div key={category.id}>
                     
                        <p className="typeName">
                          {category.categoryType}
                        </p>
                        <p className="description">
                          {category.description}
                        </p>

                      
                       
                        <p>
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
                        </p>
                      
                      </div>
                      </div>
                      </div>
                      </div>
                      
                      
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan={4}>No data available</td>
                  </tr>
                )}
        
          
          </div>
          </td>
          
      
      </div>
    </div>
  );
}

export default CategoryTable;
