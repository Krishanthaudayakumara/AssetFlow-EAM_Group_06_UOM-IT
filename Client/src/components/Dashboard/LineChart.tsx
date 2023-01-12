
import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
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
        text: "Support Tickets ",
      },
    },
  };
   
  const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

  const data = {
    labels,
    datasets: [
      {
        label: "Support tickets for each month",
        data: [1200, 1900, 300, 500, 2000, 305,100],
        borderColor: "#482890",
        backgroundColor: "#482890",
      },
      
    ],
  };
  const LineChart: React.FC = () => {
    return (
     <>
    <div>

  
     <Line
     data={data} 
     options={options}  
     /> ;
     </div>
   </>
 
   ); 
 };
 
 export default LineChart;