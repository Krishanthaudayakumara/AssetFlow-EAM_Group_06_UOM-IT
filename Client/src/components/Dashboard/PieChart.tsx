import React from 'react';
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
  return (
    <>
    <div className="class1" style={{width:"80%",height:"50%",display:"flex",alignItems:"right",justifyContent:"space-around"}}>
    <Pie data={data} />
    </div>
  </>

  ); 
};

export default PieChart;