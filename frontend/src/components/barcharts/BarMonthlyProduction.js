import React from 'react'
import { ResponsiveBar } from '@nivo/bar'

const BarMonthlyProduction = ({ keys, data, legend }) => {
  return (
    <div style={{ height: '300px' }}>
      <ResponsiveBar
        keys={keys}
        data={data}
        indexBy="year-month"
        layout="vertical"
        margin={{ top: 50, right: 100, bottom: 50, left: 70 }}
        padding={0.3}
        valueScale={{ type: 'linear' }}
        indexScale={{ type: 'band', round: true }}
        colors={['#013A63', '#2A6F97', '#468FAF', '#61A5C2', '#A9D6E5', '#15616d']}
        borderColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
        axisTop={null}
        colorBy="id"
        axisRight={null}
        // onClick={(data, event) => handleonClick(data)}
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
          // onClick: handleonClick,
        }}
        legends={[
          {
            anchor: 'right',
            direction: 'column',
            justify: false,
            translateX: 100,
            translateY: 0,
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
        enableLabel={false}
        labelTextColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
        role="application"
        ariaLabel="Nivo bar chart demo"
        barAriaLabel={function (e) {
          return e.id + ': ' + e.formattedValue + ' in country: ' + e.indexValue
        }}
      />
    </div>
  )
}
export default BarMonthlyProduction
