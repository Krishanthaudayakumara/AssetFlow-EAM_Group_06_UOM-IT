import React, { FC } from 'react';
import { Bar } from 'react-chartjs-2';

interface ChartData {
  data: {
    labels: string[];
    datasets: {
      label: string;
      data: number[];
      backgroundColor: string[];
      barThickness: number;
    }[];
  };
  options?: object;
}

const FeedBackBarChart: FC<ChartData> = (props) => {
  return <Bar data={props.data} options={props.options} />;
};

export default FeedBackBarChart;
