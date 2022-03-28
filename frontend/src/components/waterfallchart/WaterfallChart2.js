import React from 'react'
import FusionCharts from 'fusioncharts'
import charts from 'fusioncharts/fusioncharts.charts'
import ReactFusioncharts from 'react-fusioncharts'
import PowerCharts from 'fusioncharts/fusioncharts.powercharts'
import FusionTheme from 'fusioncharts/themes/fusioncharts.theme.fusion'
import ReactFC from 'react-fusioncharts'

// Resolves charts dependancy
ReactFC.fcRoot(FusionCharts, PowerCharts, FusionTheme)

export default function WaterfallChart2() {
  charts(FusionCharts)

  const dataSource = {
    chart: {
      caption: 'TickTock - Profit Analysis',
      subcaption1: 'Last month',
      numberprefix: '$',
      sumlabel: 'Total {br} Profit',
      showvalues: '1',
      theme: 'fusion',
      plottooltext: '$label is <b>$datavalue</b>',
    },
    data: [
      {
        label: 'Online sales',
        value: '420000',
      },
      {
        label: 'Store Sales',
        value: '710000',
      },
      {
        label: 'Total Sales',
        issum: '1',
      },
      {
        label: 'Fixed Costs',
        value: '-250000',
      },
      {
        label: 'Variable Costs',
        value: '-156000',
      },
      {
        label: 'COGS',
        value: '-310000',
      },
      {
        label: 'Ads Costs',
        value: '-86000',
      },
      {
        label: 'Total Costs',
        issum: '1',
        cumulative: '0',
      },
    ],
  }
  return (
    <div>
      <ReactFusioncharts
        type="waterfall2d"
        width="100%"
        height="100%"
        dataFormat="JSON"
        dataSource={dataSource}
      />
    </div>
  )
}
