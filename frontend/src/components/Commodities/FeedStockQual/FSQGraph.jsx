import React from "react";
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const data = [
  {
    name: "Quality A",
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: "Quality B",
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: "Quality C",
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: "Quality D",
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: "Quality E",
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: "Quality F",
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: "Quality G",
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];

function FSQGraph() {
  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart width={500} height={400} data={data}>
        <Bar dataKey="uv" fill="#2c384a" />
        <XAxis dataKey="name" />
        <YAxis dataKey="uv" />
        <Tooltip />
      </BarChart>
    </ResponsiveContainer>
  );
}

export default FSQGraph;
