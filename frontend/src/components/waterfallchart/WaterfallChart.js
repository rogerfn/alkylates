import React from 'react'
import ReactDOM from 'react-dom'
import Chart from 'react-google-charts'

export default function WaterfallChart({ data, options }) {
  return (
    <div>
      <Chart
        chartType="CandlestickChart"
        width="100%"
        height="400px"
        data={data}
        options={options}
      />
    </div>
  )
}
