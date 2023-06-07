import axios from 'axios';

const BASE_URL = 'http://localhost:5087/api/SubCategory';

export const getSubCategories = () => {
  return axios.get(BASE_URL);
};

export const getSubCategoriesByCategoryId = (categoryId:any) => {
    return axios.get(`${BASE_URL}/category/${categoryId}`);
  };
  

  export const deleteSubCategory = async (id: any) => {
    const response = await axios.delete(`${BASE_URL}/${id}`);
    return response.data;
  };
  
  export const createSubCategory = async (subcategory: any) => {
    const formData = new FormData();
    formData.append('name', subcategory.name);
    formData.append('image', subcategory.image);
    formData.append('categoryId', subcategory.categoryId);
  
    const response = await axios.post(`${BASE_URL}/`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  
    return response.data;
  };