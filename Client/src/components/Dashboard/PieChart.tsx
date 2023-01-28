import React from 'react';
import { Pie} from 'react-chartjs-2';

interface PieChartProps {
  data: {
    labels: string[];
    datasets: [
      {
        label: string;
        data: number[];
        borderColor:string[];
        backgroundColor: string[];
      },
      
    ];
  };
 
}

const PieChart: React.FC<PieChartProps > = (props) => {
    return (
        <div>
            <Pie data={props.data}  />
        </div>
    );
}

export default PieChart;

