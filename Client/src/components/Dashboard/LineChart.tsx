import React from 'react';
import { Line} from 'react-chartjs-2';

interface LineChartProps {
  data: {
    labels: string[];
    datasets: [
      {
        label: string;
        data: number[];
        borderColor:string;
        backgroundColor: string;
      },
      
    ];
  };
  options?: object;
}

const LineChart: React.FC<LineChartProps > = (props) => {
    return (
        <div>
            <Line data={props.data} options={props.options} />
        </div>
    );
}

export default LineChart;

