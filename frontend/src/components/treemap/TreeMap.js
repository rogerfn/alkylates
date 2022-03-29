import React from 'react'
import { ResponsiveTreeMap } from '@nivo/treemap'

const TreeMap = ({ data }) => {
  return (
    <div style={{ height: '300px' }}>
      <ResponsiveTreeMap
        data={data}
        identity="name"
        value="loc"
        valueFormat=".02s"
        orientLabel={true}
        margin={{ top: 10, right: 10, bottom: 10, left: 10 }}
        colors={['#013A63', '#468FAF', '#A9D6E5', '#15616d']}
        label={function (e) {
          return e.id + ' (' + e.formattedValue + ')'
        }}
        labelTextColor="white"
        labelSkipSize={12}
        parentLabelPosition="top"
        parentLabelTextColor="white"
        parentLabelSize={25}
        nodeOpacity={0.45}
        borderColor="white"
      />
    </div>
  )
}
export default TreeMap
