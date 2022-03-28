import React from 'react'
import { ResponsiveLine } from '@nivo/line'

const GantNivoLine = ({ data, linethick, style_input }) => {
  return (
    <div style={style_input}>
      <ResponsiveLine
        data={data}
        lineWidth={linethick}
        enableSlices="x"
        enableGridY={false}
        margin={{ top: 50, right: 50, bottom: 50, left: 170 }}
        colors={(data) => data.color}
        sliceTooltip={({ slice }) => {
          return (
            <div
              style={{
                background: 'white',
                padding: '9px 12px',
                border: '1px solid #ccc',
              }}
            >
              {slice.points.map((point) => (
                <div
                  key={point.id}
                  style={{
                    color: point.serieColor,
                    padding: '3px 0',
                  }}
                >
                  <div>
                    <strong> Product : </strong> {point.data.yFormatted}
                  </div>
                  <div>
                    <strong> Date : </strong> {point.data.xFormatted}
                  </div>
                  <div>
                    <strong> Volume : </strong> {point.data.z}{' '}
                  </div>
                </div>
              ))}
            </div>
          )
        }}
        xFormat="time:%Y-%m-%d %H:%M"
        xScale={{
          type: 'time',
          format: '%Y-%m-%d %H:%M',
          useUTC: false,
          precision: 'minute',
          min: new Date(Date.now() - 86400000 - 86400000),
          max: new Date(Date.now() + 86400000),
        }}
        yScale={{ type: 'point' }}
        axisTop={null}
        axisRight={null}
        axisLeft={{
          tickPadding: 10,
        }}
        axisBottom={{
          format: '%a %d/%m %Hh%M',
          orient: 'bottom',
          tickSize: 5,
          tickPadding: 15,
          tickValues: 'every 12 hours',
          tickRotation: 0,
          legend: 'Date',
          legendOffset: 45,
          legendPosition: 'middle',
        }}
        markers={[
          {
            axis: 'x',
            value: new Date(),
            lineStyle: { stroke: '#b0413e', strokeWidth: 2 },
            legend: 'Now',
          },
        ]}
        pointSize={18}
        // pointColor={['white']}
        pointBorderWidth={2}
        pointBorderColor={{ from: 'serieColor' }}
        pointLabelYOffset={-12}
        useMesh={true}
      />
    </div>
  )
}
export default GantNivoLine
