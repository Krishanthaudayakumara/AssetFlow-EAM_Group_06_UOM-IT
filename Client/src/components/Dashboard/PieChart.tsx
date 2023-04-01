import React from 'react'
import {
  Chart as ChartJs,
  Tooltip,
  Title,
  ArcElement,
  Legend,
} from 'chart.js/auto'
import { Pie } from 'react-chartjs-2'
ChartJs.register(Tooltip, Title, ArcElement, Legend)

const data = {
  labels: ['Table', 'Chair', 'Monitor', 'Mouse'],
  datasets: [
    {
      label: 'Assets Types',
      data: [1200, 600, 300, 1000],
      backgroundColor: ['#482890', '#e2a9e5', '#632c65', '#4b384c'],
      borderColor: ['#482890', '#e2a9e5', '#632c65', '#4b384c'],
    },
  ],
}
const PieChart: React.FC = () => {
  return (
    <>
      <div className="class1">
        <Pie data={data} />
      </div>
    </>
  )
}

export default PieChart
