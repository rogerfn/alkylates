import { format, parseISO } from "date-fns";
import { subDays } from "date-fns/esm";
import React from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const data = [];
for (let num = 30; num >= 0; num--) {
  data.push({
    date: subDays(new Date(), num).toISOString().substring(0, 10),
    value: 1 + Math.random(),
  });
}

function FSCGraph() {
  return (
    <ResponsiveContainer width="100%" height={400}>
      <AreaChart data={data} width={500} height={400}>
        <defs>
          <linearGradient id="color" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#2c384a" stopOpacity={0.4} />
            <stop offset="75%" stopColor="#2c384a" stopOpacity={0.05} />
          </linearGradient>
        </defs>

        <Area dataKey="value" stroke="#2c384a" fill="url(#color)" />

        <XAxis
          dataKey="date"
          axisLine={false}
          tickLine={false}
          tickFormatter={(str) => {
            const date = parseISO(str);
            if (date.getDate() % 7 === 0) {
              return format(date, "MMM, d");
            }
            return "";
          }}
        />

        <YAxis
          datakey="value"
          axisLine={false}
          tickLine={false}
          tickCount={8}
          tickFormatter={(number) => `R${number.toFixed(2)}`}
        />

        <Tooltip content={<CustomTooltip />} />

        <CartesianGrid opacity={0.1} vertical={false} />
      </AreaChart>
    </ResponsiveContainer>
  );
}

export default FSCGraph;
function CustomTooltip({ active, payload, label }) {
  if (active) {
    return (
      <div className="tooltip">
        <h4>{format(parseISO(label), "eeee, d MMM, yyyy")}</h4>
        <p>R{payload[0].value.toFixed(2)} ZAR</p>
      </div>
    );
  }
  return null;
}
