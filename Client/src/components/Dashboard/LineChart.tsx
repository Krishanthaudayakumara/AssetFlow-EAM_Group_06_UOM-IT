import React, { useState } from 'react'
import { Line } from 'react-chartjs-2'
import type { ChartData, ChartOptions } from 'chart.js'

interface Props {
  Lineoptions: ChartOptions<'line'>
  Linedata: ChartData<'line'>
}

const LineChart: React.FC<Props> = ({ Linedata, Lineoptions }) => {
  return (
    <div>
      <Line data={Linedata} options={Lineoptions} />
    </div>
  )
}

export default LineChart
