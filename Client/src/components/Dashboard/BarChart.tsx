import React, { FC } from 'react'
import { Bar } from 'react-chartjs-2'
interface BarChartProps {
  data: {
    labels: string[]
    datasets: [
      {
        label: string
        data: number[]
        backgroundColor: string
      },
      {
        label: string
        data: number[]
        backgroundColor: string
      },
    ]
  }
  options?: object
}
const BarChart: FC<BarChartProps> = (props) => {
  return <Bar data={props.data} options={props.options} />
}

export default BarChart
