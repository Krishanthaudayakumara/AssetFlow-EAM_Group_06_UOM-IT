import React, { useState } from 'react';
import { Line} from 'react-chartjs-2';
import type { ChartData, ChartOptions } from 'chart.js';


interface Props {
  Lineoptions: ChartOptions<'line'>;
  Linedata: ChartData<'line'>;
}
const LineChart: React.FC<Props> = ({ Linedata,Lineoptions }) => {
    const [filter, setFilter] = useState<'yearly' | 'monthly' | 'daily'>('yearly');
    const filteredData = () => {
      if (!Linedata.labels) {
        return Linedata;
      }
      switch (filter) {
        case 'yearly':
          // Do not filter the data, return all data
          return Linedata;
        case 'monthly':
          // Filter the data for a particular month
          const filteredMonthlyData = {
            labels:  Linedata.labels.filter((label) => {
              // Check if the label represents a data for the selected month
              // For example, you can check if the label starts with the name of the month, etc.
              return label===('February');
            }),
            datasets: Linedata.datasets.map((dataset) => {
              return {
                label: dataset.label,
                data: dataset.data.filter((data, index) => {
                  return Linedata.labels![index]===('February');
                }),
                backgroundColor: dataset.backgroundColor,
              };
            }),
          };
          return filteredMonthlyData;
        case 'daily':
          // Filter the data for a particular day
          const filteredDailyData = {
            labels: Linedata.labels.filter((label) => {
              // Check if the label represents a data for the selected day
              // For example, you can check if the label is equal to the name of the day, etc.
              return label === '02/01/2023';
            }),
            datasets: Linedata.datasets.map((dataset) => {
              return {
                label: dataset.label,
                data: dataset.data.filter((data, index) => {
                  return Linedata.labels![index] === '02/01/2023';
                }),
                backgroundColor: dataset.backgroundColor,
              };
            }),
          };
          return filteredDailyData;
        default:
          return Linedata;
      }
    };

    return (
        <div>
      <select value={filter} onChange={(e) => setFilter(e.target.value as 'yearly' | 'monthly' | 'daily')}>
        <option value="yearly">Yearly</option>
        <option value="monthly">Monthly</option>
        <option value="daily">Daily</option>
      </select>
      <Line data={filteredData()} options={Lineoptions} />
    </div>
  );

};
export default LineChart;