import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import axios from 'axios';

import '../../css/Home.css';
import CardDashboard from '../../components/Dashboard/CardDashboard';
import PieChart from '../../components/Dashboard/PieChart';
import InventoryBarchart from '../../components/Dashboard/InventoryBarchart';
import "./../../css/Table.css";
const options = {
  title: {
    display: true,
    text: 'Chart.js Bar Chart',
  },
};

const InventoryDashboard: React.FC = () => {
  const [assetCount, setAssetCount] = useState(0);
  const [categoryCount, setCategoryCount] = useState(0);
  const [subCategoryCount, setSubCategoryCount] = useState(0);
  const [categoryType, setCategoryTypes] = useState<string[]>([]);
  const [categoryTypeCount, setCategoryTypeCounts] = useState<number[]>([]);
  const [subcategoryTypeData, setSubcategoryTypeData] = useState<{
    labels: string[];
    datasets: {
      label: string;
      data: number[];
      backgroundColor: string[];
      barThickness: number;
    }[];
  }>({
    labels: [],
    datasets: [],
  });

  useEffect(() => {
    // Fetch asset count
    axios
      .get('http://localhost:5087/api/InventoryDashboard/inventory-asset-count')
      .then((response) => {
        setAssetCount(response.data.totalCount);
      })
      .catch((error) => {
        console.error('Error fetching asset count:', error);
      });

    // Fetch category count
    axios
      .get('http://localhost:5087/api/InventoryDashboard/category-count')
      .then((response) => {
        setCategoryCount(response.data.totalCategoreyCount);
      })
      .catch((error) => {
        console.error('Error fetching category count:', error);
      });

    // Fetch subcategory count
    axios
      .get('http://localhost:5087/api/InventoryDashboard/subcategory-count')
      .then((response) => {
        setSubCategoryCount(response.data.totalSubCategoryCount);
      })
      .catch((error) => {
        console.error('Error fetching subcategory count:', error);
      });

    
    
    // Fetch subcategory types with counts
    axios
      .get('http://localhost:5087/api/InventoryDashboard/subcategory-types')
      .then((response) => {
        const subcategoryData = response.data;
        setCategoryTypes(
          subcategoryData.map((subCategory: { subCategoryType: string }) => subCategory.subCategoryType)
        );
        setCategoryTypeCounts(
          subcategoryData.map((subCategory: { count: number }) => subCategory.count)
        );

        // Create data for subcategory type bar chart
        const subcategoryTypeData = {
          labels: subcategoryData.map((subCategory: { subCategoryType: string }) => subCategory.subCategoryType),
          datasets: [
            {
              label: 'Subcategory Types',
              data: subcategoryData.map((subcategory: { count: number }) => subcategory.count),
              backgroundColor: Array(subcategoryData.length).fill('#632c65'), // Customize the background color as needed
              barThickness: 40, // Customize the bar thickness as needed
            },
          ],
        };
        setSubcategoryTypeData(subcategoryTypeData);
      })
      .catch((error) => {
        console.error('Error fetching subcategory types:', error);
      });
      axios
      .get('http://localhost:5087/api/InventoryDashboard/category-types')
      .then((response) => {
        const categoryData = response.data;
        setCategoryTypes(
          categoryData.map((category: { categoryType: string }) => category.categoryType)
        );
        setCategoryTypeCounts(
          categoryData.map((category: { count: number }) => category.count)
        );
      })
      .catch((error) => {
        console.error('Error fetching category types:', error);
      });

  }, []);

  return (
    <div>
      <Container>
        <div>
          <h2  className="table-page-heading">INVENTORY DASHBOARD</h2>
          <div className="row mb-6" style={{ margin: '0px 0 0 65px' }}>
            <CardDashboard name="Total assets" count={assetCount} />
            <CardDashboard name="Total Categories" count={categoryCount} />
            <CardDashboard name="Total Subcategories" count={subCategoryCount} />
          </div>
          <h2 style={{ margin: '0px 0 0 65px' }}>SubCategorey Count</h2>
          <div className="shadow p-3 mb-5 bg-white rounded" style={{ margin: '0px 2px 2px 65px' }}>
            <InventoryBarchart data={subcategoryTypeData}  options={{
      ...options,
      scales: {
        x: {
          title: {
            display: true,
            text: 'Subcategory Type',
          },
        },
        y: {
          title: {
            display: true,
            text: 'Asset Count',
          },
        },
      },
    }} />
          </div>
         
         <h2 style={{ margin: '0px 0 0 65px' }}>Categorey Types</h2>
         <div  className="shadow p-4 mb-7 bg-white rounded" style={{ margin: '0px 2px 2px 300px', width: '500px', height: '350px', alignContent: 'center' }}>
            <PieChart
              data={{
                labels: categoryType,
                datasets: [
                  {
                    label: 'Category Types',
                    data: categoryTypeCount,
                    backgroundColor: [
                      '#482890',
                      '#ff615a',
                      '#36a2eb',
                      '#fd6b19',
                      '#4bc0c0',
                      '#9966ff',
                    ],
                    borderColor: [
                      '#482890',
                      '#ff615a',
                      '#36a2eb',
                      '#fd6b19',
                      '#4bc0c0',
                      '#9966ff',
                    ],
                  },
                ],
              }}
            />
          </div>
        </div>
      </Container>
    </div>
  );
};

export default InventoryDashboard;





