import React from 'react'
import { ResponsiveBar } from '@nivo/bar'

const BarProductionLateProduct = ({ data }) => {
  return (
    <div style={{ height: '400px' }}>
      <ResponsiveBar
        keys={['hours']}
        data={data}
        indexBy="product"
        layout="horizontal"
        margin={{ top: 50, right: 50, bottom: 50, left: 120 }}
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
          legend: 'Lateness (hours)',
          legendPosition: 'middle',
          legendOffset: 32,
        }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legendPosition: 'middle',
          legend: 'Products',
          legendOffset: -100,
          //   format: '.2s',
        }}
        labelSkipWidth={12}
        labelSkipHeight={12}
        enableLabel={true}
        labelTextColor="white"
        role="application"
        ariaLabel="Nivo bar chart demo"
        barAriaLabel={function (e) {
          return e.id + ': ' + e.formattedValue + ' in country: ' + e.indexValue
        }}
      />
    </div>
  )
}
export default BarProductionLateProduct
