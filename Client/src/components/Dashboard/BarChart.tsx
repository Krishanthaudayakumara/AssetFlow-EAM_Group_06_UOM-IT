import React from 'react';
import {Chart as ChartJs,BarElement,CategoryScale,LinearScale,Tooltip,Legend} from "chart.js/auto";
import { Bar} from 'react-chartjs-2';

ChartJs.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Tooltip,
    Legend
  );
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
       
      },
    },
  };
  const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July','Augut'];
  const data = {
    labels,
    datasets: [
      {
        label: 'Issued',
        data: [12, 19, 3, 5, 2, 3,1,5],
        backgroundColor: "#482890",
      },
      {
        label: 'Returned',
        data: [20, 10, 2, 5, 2, 3,8,9],
        backgroundColor: "#ff615a",
      },
    ],
  };

const BarChart: React.FC = () => {
     return (
      <>
     <div   style={
      {padding: "20px",
      width:"90%"
      }
}>
    <Bar
      data={data} 
      options={options}  
      /> ;
      </div>
    </>
  
    ); 
  };
  
  export default BarChart;