import React from 'react'
import { ResponsiveLine } from '@nivo/line'

const ProductionActualSchedule = ({ data }) => {
  return (
    <div style={{ height: '300px' }}>
      <ResponsiveLine
        data={data}
        margin={{ top: 50, right: 140, bottom: 50, left: 60 }}
        colors={['#013A63', '#468FAF', '#A9D6E5']}
        xFormat="time:%Y-%m-%d"
        xScale={{
          type: 'time',
          format: '%Y-%m-%d',
          useUTC: false,
          precision: 'day',
        }}
        yScale={{
          type: 'linear',
          min: 'auto',
          max: 'auto',
          stacked: false,
          reverse: false,
        }}
        yFormat=" >-.2f"
        axisTop={null}
        axisRight={null}
        axisBottom={{
          format: '%b %d',
          orient: 'bottom',
          tickSize: 5,
          tickPadding: 5,
          tickValues: 'every month',
          tickRotation: 0,
          legend: 'Date',
          legendOffset: 36,
          legendPosition: 'middle',
        }}
        axisLeft={{
          orient: 'left',
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          format: '.2s',
          legend: 'Production Volumes (mT)',
          legendOffset: -50,
          legendPosition: 'middle',
        }}
        pointSize={7}
        pointColor={{ theme: 'background' }}
        pointBorderWidth={2}
        pointBorderColor={{ from: 'serieColor' }}
        pointLabelYOffset={-12}
        useMesh={true}
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
      />
    </div>
  )
}
export default ProductionActualSchedule
