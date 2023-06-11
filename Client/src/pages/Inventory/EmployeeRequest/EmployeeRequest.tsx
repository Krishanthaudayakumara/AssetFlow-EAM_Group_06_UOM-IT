import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../../css/Inventory/Request.css";
import SubCategoryCard from "../../../components/Inventory/Request/SubCategoryCard";
import AssetCard from "../../../components/Inventory/Request/AssetCard";
import "../../../css/Table.css";

interface Category {
  id: number;
  name: string;
}

interface SubCategory {
  id: number;
  name: string;
}

interface Asset {
  id: number;
  name: string;
  status: string;
}

const EmployeeRequest: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [subCategories, setSubCategories] = useState<SubCategory[]>([]);
  const [assets, setAssets] = useState<Asset[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null
  );
  const [selectedSubCategory, setSelectedSubCategory] =
    useState<SubCategory | null>(null);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5087/api/EmployeeRequest/categories"
      );
      setCategories(response.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const fetchSubCategories = async (categoryId: number) => {
    try {
      const response = await axios.get(
        `http://localhost:5087/api/EmployeeRequest/subcategories/${categoryId}`
      );
      setSubCategories(response.data);
      setSelectedCategory(
        categories.find((category) => category.id === categoryId) || null
      );
      setSelectedSubCategory(null);
    } catch (error) {
      console.error("Error fetching subcategories:", error);
    }
  };

  const fetchAssets = async (subcategoryId: number) => {
    try {
      const response = await axios.get(
        `http://localhost:5087/api/EmployeeRequest/assets/${subcategoryId}`
      );
      const assetsData = response.data;
      const uniqueAssets = [];
      const assetNames = new Set();

      for (const asset of assetsData) {
        if (asset.status !== "Assign" && !assetNames.has(asset.name)) {
          uniqueAssets.push(asset);
          assetNames.add(asset.name);
        }
      }

      setAssets(uniqueAssets);
      setSelectedSubCategory(
        subCategories.find((subCategory) => subCategory.id === subcategoryId) ||
          null
      );
    } catch (error) {
      console.error("Error fetching assets:", error);
    }
  };

  return (
    <div>
      <h2 className="table-page-heading">EMPLOYEE REQUEST</h2>
    <div className="employee-request">
      <div className="content">
        <ul>
          {categories.map((category) => (
            <li key={category.id}>
              <h4 onClick={() => fetchSubCategories(category.id)}>
                {category.name}
              </h4>
              {selectedCategory?.id === category.id && (
                <ul>
                  {subCategories.map((subCategory) => (
                    <li key={subCategory.id}>
                      <h5 onClick={() => fetchAssets(subCategory.id)}>
                        {subCategory.name}
                      </h5>
                      {selectedSubCategory?.id === subCategory.id && (
                        <ul>
                          {assets.map((asset) => (
                            <li key={asset.id}>{asset.name}</li>
                          ))}
                        </ul>
                      )}
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </div>
      <div className="vertical-line" style={{ marginLeft: "20px" }}></div>
      <div className="content">
        {selectedSubCategory ? (
          <AssetCard assets={assets} />
        ) : (
          selectedCategory && <SubCategoryCard subCategories={subCategories} />
        )}
      </div>
    </div>
    </div>
  );
};

export default EmployeeRequest;
