import React from 'react';
import { Line } from 'react-chartjs-2';
import type { ChartData, ChartOptions } from 'chart.js';

interface Props {
  Linedata: ChartData<'line'>;

  Lineoptions: ChartOptions<'line'>
}

const FacilityLineChart: React.FC<Props> = ({ Linedata, Lineoptions }) => {
  return (
    <div>
      <Line data={Linedata} options={Lineoptions} />
    </div>
  );
};

export default FacilityLineChart;
