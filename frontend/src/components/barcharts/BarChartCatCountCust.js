import React, { useState, useEffect, lazy } from 'react'
import axios from 'axios'
import { ResponsiveBar } from '@nivo/bar'
import FormatDate from '../../functions/Functions'

export default function BarChartCatCountCust({ databarcust, handleonClickCust }) {
  return (
    <div style={{ height: '300px' }}>
      <ResponsiveBar
        data={databarcust}
        keys={['number_delays']}
        indexBy="customer"
        margin={{ top: 50, right: 50, bottom: 50, left: 60 }}
        padding={0.3}
        valueScale={{ type: 'linear' }}
        indexScale={{ type: 'band', round: true }}
        colors={['#013A63', '#2A6F97', '#468FAF', '#61A5C2', '#A9D6E5']}
        borderColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
        axisTop={null}
        axisRight={null}
        onClick={(data, event) => handleonClickCust(data)}
        axisBottom={{
          tickSize: 5,
          format: (v) => {
            return v.length > 15 ? (
              <tspan>
                {v.substring(0, 10) + '...'}
                <title>{v}</title>
              </tspan>
            ) : (
              v
            )
          },
          tickPadding: 5,
          tickRotation: 0,
          legendPosition: 'middle',
          legendOffset: 32,
          onClick: handleonClickCust,
        }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          legend: 'Number of Delays',
          tickRotation: 0,
          legendPosition: 'middle',
          legendOffset: -40,
        }}
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
