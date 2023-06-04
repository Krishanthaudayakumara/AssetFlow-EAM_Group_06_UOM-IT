import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import SubCategoryCard from "../../../components/Inventory/Category/SubCategoryCard";
import { deleteSubCategory, getSubCategories, getSubCategoriesByCategoryId } from "../../../api/subCategoryApi";
import { getCategory } from "../../../api/categoryApi";
import { useParams } from "react-router-dom";

const CategoryDetailPage: React.FC = () => {
  const { id } = useParams();

  const [category, setCategory] = useState<any>({});
  const [subcategories, setSubcategories] = useState([]);

  useEffect(() => {
    fetchCategory();
    fetchSubCategories();
  }, []);



  const fetchSubCategories = async () => {
    try {
      const response = await getSubCategories();
      setSubcategories(response.data);
    } catch (error) {
      console.error('Failed to fetch subcategories:', error);
    }
  };

  const handleDeleteSubCategory = async (id: number) => {
    try {
      await deleteSubCategory(id);
      fetchSubCategories();
    } catch (error) {
      console.error('Failed to delete subcategory:', error);
    }
  };
  
  const fetchCategory = async () => {
    try {
      const response = await getCategory(parseInt(id || ""));
      setCategory(response.data);
    } catch (error) {
      console.error("Failed to fetch category:", error);
    }
  };

  

  return (
    <Container>
      <h1>Category Details</h1>
      <h2>{category.name}</h2>
      <p>{category.description}</p>
      <img src={category.imageUrl} alt={category.name} />
      <h3>Subcategories</h3>
      {subcategories.map((subcategory: any) => (
        <SubCategoryCard
          key={subcategory.id}
          subcategory={subcategory}
          onDelete={handleDeleteSubCategory}
        />
      ))}
    </Container>
  );
};

export default CategoryDetailPage;
