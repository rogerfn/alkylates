import React from 'react'
import { Chart } from 'react-google-charts'

const Gant = ({ data_rows }) => {
  const columns = [
    { type: 'string', label: 'Task ID' },
    { type: 'string', label: 'Task Name' },
    { type: 'string', label: 'Resource' },
    { type: 'date', label: 'Start Date' },
    { type: 'date', label: 'End Date' },
    { type: 'number', label: 'Duration' },
    { type: 'number', label: 'Percent Complete' },
    { type: 'string', label: 'Dependencies' },
  ]

  const rows_data = data_rows.map((el, index) => [
    el.id + index,
    el.id,
    el.unit,
    new Date(el.start),
    new Date(el.end),
    null,
    100,
    null,
  ])
  const data = [columns, ...rows_data]

  const options = {
    height: 400,
    hAxis: {
      title: 'Age',
    },
    gantt: {
      trackHeight: 30,
      palette: [
        {
          color: '#013A63',
          dark: '#013A63',
          light: '#013A63',
        },
        {
          color: '#2A6F97',
          dark: '#2A6F97',
          light: '#2A6F97',
        },
        {
          color: '#468FAF',
          dark: '#468FAF',
          light: '#468FAF',
        },
      ],
      labelStyle: {
        fontName: 'Apple-System',
      },
    },
    colors: ['#013A63', '#2A6F97', '#468FAF', '#61A5C2', '#A9D6E5'],
  }
  return (
    <Chart
      style={{
        fontFamily:
          'system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", "Liberation Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
      }}
      chartType="Gantt"
      width="100%"
      height="50%"
      data={data}
      options={options}
      onClick={() => {
        console.log(rows_data)
      }}
    />
  )
}
export default Gant
