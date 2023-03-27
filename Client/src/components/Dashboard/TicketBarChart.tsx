import React, { FC, useState , useEffect} from 'react';
import { Bar } from 'react-chartjs-2';
import axios from "axios";
interface chartData {
  data: {
    labels: string[];
    datasets: [
      {
        label: string;
        data: number[];
        backgroundColor: string;
      },
      {
        label: string;
        data: number[];
        backgroundColor: string;
      },
      {
        label: string;
        data: number[];
        backgroundColor: string;
      }
    ];
  };
  options?: object;
}


const TicketBarChart: FC<chartData> = (props) => {
  
   

  return <Bar data={props.data} options={props.options} />;
};

export default TicketBarChart;
