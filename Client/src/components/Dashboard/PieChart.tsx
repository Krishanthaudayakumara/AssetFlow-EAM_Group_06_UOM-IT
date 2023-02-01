import React, { useState } from 'react';
import {Chart as  ChartJs,Tooltip,Title,ArcElement,Legend} from "chart.js/auto";
import { Pie } from 'react-chartjs-2';
ChartJs.register(

  Tooltip,Title,ArcElement,Legend
);

const data = {
    labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
    datasets: [
      {
        label: '# of Votes',
        data: [12, 19, 3, 5, 2, 3],
        backgroundColor: [
          'pink',
          '#17a2b8',
          '#ffc107',
          'rgb(87, 185, 96)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
      },
    ],
  };



const PieChart: React.FC = () => {
  const [selectedFilter, setSelectedFilter] = useState<'yearly' | 'monthly' | 'weekly'>('yearly');

  const handleFilterChange = (filter: 'yearly' | 'monthly' | 'weekly') => {
    setSelectedFilter(filter);
  };

  const getYearlyData = () => {
    return {
      labels: ['Red', 'Blue', 'Yellow'],
      datasets: [
        {
          label: '# of Votes',
          data: [12, 19, 3],
          backgroundColor: [
            'pink',
            '#17a2b8',
            '#ffc107',
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
          ],
        },
      ],
    };
  };

  const getMonthlyData = () => {
    return {
      labels: ['Green', 'Purple'],
      datasets: [
        {
          label: '# of Votes',
          data: [5, 2],
          backgroundColor: [
            'rgb(87, 185, 96)',
            'rgba(153, 102, 255, 0.2)',
          ],
          borderColor: [
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
          ],
        },
      ],
    };
  };

  const getWeeklyData = () => {
    return {
      labels: ['Orange'],
      datasets: [
        {
          label: '# of Votes',
          data: [3],
          backgroundColor: [
            'rgba(255, 159, 64, 0.2)',
          ],
          borderColor: [
            'rgba(255, 159, 64, 1)',
          ],
        },
      ],
    };
  };

  let data;
  switch (selectedFilter) {
    case 'yearly':
      data = getYearlyData();
      break;
    case 'monthly':
      data = getMonthlyData();
      break;
    case 'weekly':
      data = getWeeklyData();
      break;
    default:
      data = getYearlyData();
      break;
  }

  return (
    <>
      <div className="filter">
        <button onClick={() => handleFilterChange('yearly')}>Yearly</button>
        <button onClick={() => handleFilterChange('monthly')}>Monthly</button>
        <button onClick={() => handleFilterChange('weekly')}>Weekly</button>
      </div>
      <div className="class1">
        <Pie data={data} />
      </div>
    </>
  );
};
export default PieChart;