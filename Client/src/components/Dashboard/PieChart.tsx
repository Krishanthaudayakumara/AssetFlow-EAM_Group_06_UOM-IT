import React from 'react';
import { Chart as ChartJs, Tooltip, Title, ArcElement, Legend } from 'chart.js/auto';
import { Pie } from 'react-chartjs-2';
ChartJs.register(Tooltip, Title, ArcElement, Legend);

interface PieChartProps {
  data: {
    labels: string[];
    datasets: {
      label: string;
      data: number[];
      backgroundColor: string[];
      borderColor: string[];
    }[];
  };
}

const PieChart: React.FC<PieChartProps> = ({ data }) => {
  return (
    <>
      <div style={{ alignContent: 'center',width:'300px',margin: '0px 0px 0px 100px'
                }}>
        <Pie data={data} />
      </div>
    </>
  );
};

export default PieChart;
