import React, { useState, ChangeEvent } from 'react';
import { createStock } from '../../../api/stockApi';

const StockModal = () => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    categoryId: 0,
    subCategoryId: 0,
    supplierId: 0,
    image: null as File | null,
    arrivalDate: '',
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (e.target.name === 'image') {
        const inputElement = e.target as HTMLInputElement;
        const file = inputElement.files && inputElement.files[0];
      setFormData({
        ...formData,
        image: file || null,
      });
    } else {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const imageFormData = new FormData();
      if (formData.image) {
        imageFormData.append('image', formData.image);
      }
      // Add other form data to the FormData object if needed
      imageFormData.append('name', formData.name);
      imageFormData.append('description', formData.description);
      imageFormData.append('categoryId', formData.categoryId.toString());
      imageFormData.append('subCategoryId', formData.subCategoryId.toString());
      imageFormData.append('supplierId', formData.supplierId.toString());
      imageFormData.append('arrivalDate', formData.arrivalDate);

      await createStock(imageFormData);
      // Reset form data
      setFormData({
        name: '',
        description: '',
        categoryId: 0,
        subCategoryId: 0,
        supplierId: 0,
        image: null,
        arrivalDate: '',
      });
      // Close the modal or perform any other necessary actions
    } catch (error) {
      console.error('Error creating stock:', error);
    }
  };

  return (
    <div>
      <h2>Create Stock</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="description">Description:</label>
          <textarea id="description" name="description" value={formData.description} onChange={handleChange}></textarea>
        </div>
        <div>
          <label htmlFor="categoryId">Category ID:</label>
          <input type="number" id="categoryId" name="categoryId" value={formData.categoryId} onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="subCategoryId">Subcategory ID:</label>
          <input type="number" id="subCategoryId" name="subCategoryId" value={formData.subCategoryId} onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="supplierId">Supplier ID:</label>
          <input type="number" id="supplierId" name="supplierId" value={formData.supplierId} onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="image">Image:</label>
          <input type="file" id="image" name="image" onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="arrivalDate">Arrival Date:</label>
          <input type="date" id="arrivalDate" name="arrivalDate" value={formData.arrivalDate} onChange={handleChange} />
        </div>
        <button type="submit">Create</button>
      </form>
    </div>
  );
};

export default StockModal;
