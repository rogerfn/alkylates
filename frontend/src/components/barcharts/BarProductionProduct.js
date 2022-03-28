import React from 'react'
import { ResponsiveBar } from '@nivo/bar'

const BarProductionProduct = ({ data }) => {
  return (
    <div style={{ height: '400px' }}>
      <ResponsiveBar
        keys={['Actuals', 'Schedule']}
        data={data}
        indexBy="product"
        layout="horizontal"
        margin={{ top: 50, right: 50, bottom: 50, left: 140 }}
        groupMode="grouped"
        padding={0.3}
        valueScale={{ type: 'linear' }}
        indexScale={{ type: 'band', round: true }}
        colors={['#013A63', '#2A6F97', '#468FAF', '#61A5C2', '#A9D6E5', '#15616d']}
        borderColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
        axisTop={null}
        colorBy="id"
        axisRight={null}
        // theme={{
        //   axis: {
        //     domain: {
        //       line: {
        //         stroke: '#777777',
        //         strokeWidth: 1,
        //       },
        //     },
        //   },
        // }}
        axisBottom={{
          tickSize: 5,
          tickPadding: 5,
          tickValues: 5,
          tickRotation: 0,
          legend: 'Product Volumes',
          legendPosition: 'middle',
          legendOffset: 32,
          format: '.2s',
        }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legendPosition: 'middle',
          legend: 'Products',
          legendOffset: -120,
        }}
        legends={[
          {
            anchor: 'top',
            direction: 'row',
            justify: false,
            translateX: 0,
            translateY: -38,
            itemsSpacing: 0,
            itemDirection: 'left-to-right',
            itemWidth: 80,
            itemHeight: 20,
            itemOpacity: 0.75,
            symbolSize: 12,
            symbolShape: 'circle',
            symbolBorderColor: 'rgba(0, 0, 0, .5)',
            toggleSerie: true,
            effects: [
              {
                on: 'hover',
                style: {
                  itemBackground: 'rgba(0, 0, 0, .03)',
                  itemOpacity: 1,
                },
              },
            ],
          },
        ]}
        labelSkipWidth={12}
        labelSkipHeight={12}
        enableLabel={true}
        labelTextColor="white"
        label={(d) => `${Intl.NumberFormat('en', { notation: 'compact' }).format(d.value)}`}
      />
    </div>
  )
}
export default BarProductionProduct
