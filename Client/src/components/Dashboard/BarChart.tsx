import React, { FC, useState } from 'react';
import { Bar } from 'react-chartjs-2';

interface BarChartProps {
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
      }
    ];
  };
  options?: object;
}

const Filter: FC<{ onChange: (value: string) => void }> = ({ onChange }) => {
  return (
    <div>
      <label>
        <input type="radio" name="filter" value="yearly" onChange={(e) => onChange(e.target.value)} />
        Yearly
      </label>
      <label>
        <input type="radio" name="filter" value="monthly" onChange={(e) => onChange(e.target.value)} />
        Monthly
      </label>
      <label>
        <input type="radio" name="filter" value="daily" onChange={(e) => onChange(e.target.value)} />
        Daily
      </label>
    </div>
  );
};
const BarChart: FC<BarChartProps> = (props) => {
  const [filter, setFilter] = useState('yearly');

  const filteredData = () => {
    switch (filter) {
      case 'yearly':
        return props.data;
      case 'monthly':
          const filteredMonthlyData = {
          labels: props.data.labels.filter((label) => {
            // Check if the label represents a data for the selected month
            // For example, you can check if the label starts with the name of the month, etc.
            return label===('January');
          }),
          datasets: props.data.datasets.map((dataset) => {
            return {
              label: dataset.label,
              data: dataset.data.filter((data, index) => {
                return props.data.labels[index]===('January');
              }),
              backgroundColor: dataset.backgroundColor,
            };
          }),
        };
        return filteredMonthlyData;
      case 'daily':
        const filteredDailyData = {
        labels: props.data.labels.filter((label) => {
          // Check if the label represents a data for the selected day
          // For example, you can check if the label is equal to the name of the day, etc.
          return label === '02/01/2023';
        }),
        datasets: props.data.datasets.map((dataset) => {
          return {
            label: dataset.label,
            data: dataset.data.filter((data, index) => {
              return props.data.labels[index] === '02/01/2023';
            }),
            backgroundColor: dataset.backgroundColor,
          };
        }),
      };
      return filteredDailyData;
      default:
        return props.data;
    }
  };

  return (
    <>
      <Filter onChange={setFilter} />
      <Bar data={filteredData()} options={props.options} />
    </>
  );
};


export default BarChart;
