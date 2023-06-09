import React from 'react';
import { Line } from 'react-chartjs-2';

interface Props {
  data: {
    labels: number[];
    datasets: {
      label: string;
      data: string[];
      borderColor: string;
      backgroundColor: string;
    }[];
  };
  options: any;
}

const LineChart: React.FC<Props> = ({ data, options }) => {
  return (
    <div>
      <Line data={data} options={options} />
    </div>
  );
};

export default LineChart;
