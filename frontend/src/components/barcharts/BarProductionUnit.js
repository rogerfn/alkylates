import React from 'react'
import { ResponsiveBar } from '@nivo/bar'

const BarProductionUnit = ({ keys, data, legend }) => {
  return (
    <div style={{ height: '300px' }}>
      <ResponsiveBar
        keys={keys}
        data={data}
        indexBy="batch__area__name"
        layout="vertical"
        margin={{ top: 50, right: 50, bottom: 50, left: 70 }}
        padding={0.3}
        valueScale={{ type: 'linear' }}
        indexScale={{ type: 'band', round: true }}
        colors={['#013A63', '#2A6F97', '#468FAF', '#61A5C2', '#A9D6E5', '#15616d']}
        borderColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
        axisTop={null}
        colorBy="id"
        axisRight={null}
        axisBottom={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: 'Unit',
          legendPosition: 'middle',
          legendOffset: 32,
        }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legendPosition: 'middle',
          legend: legend,
          legendOffset: -50,
          format: '.2s',
        }}
        labelSkipWidth={12}
        labelSkipHeight={12}
        enableLabel={true}
        labelTextColor="white"
        label={(d) => `${Intl.NumberFormat('en', { notation: 'compact' }).format(d.value)}`}
      />
    </div>
  )
}
export default BarProductionUnit
