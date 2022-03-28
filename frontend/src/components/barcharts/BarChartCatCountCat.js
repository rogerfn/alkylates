import React, { useState, useEffect, lazy } from 'react'
import axios from 'axios'
import { ResponsiveBar } from '@nivo/bar'

export default function BarChartCatCountCat({ databarcat, handleonClick }) {
  return (
    <div style={{ height: '300px' }}>
      <ResponsiveBar
        keys={['number_delays']}
        data={databarcat}
        indexBy="category"
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
        onClick={(data, event) => handleonClick(data)}
        axisBottom={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: 'Number of Delays',
          legendPosition: 'middle',
          legendOffset: 32,
        }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legendPosition: 'middle',
          legendOffset: -40,
          onClick: handleonClick,
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
