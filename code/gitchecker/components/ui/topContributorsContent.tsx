import * as React from "react"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts'

function TopContributorsContent(props) {
    let chartData = props.chartData;
    let COLORS = props.colors;
    return (
        <ResponsiveContainer width="100%" height={300}>
            <BarChart
            layout="vertical"
            data={chartData.developerData}
            margin={{ top: 0, right: 0, bottom: 0, left: 40 }}
            >
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis type="number" stroke="#9CA3AF" />
            <YAxis dataKey="username" type="category" stroke="#9CA3AF" width={100} />
            <Tooltip
                contentStyle={{ backgroundColor: '#1F2937', border: 'none', color: '#fff' }}
                cursor={{ fill: 'rgba(167, 139, 250, 0.1)' }}
            />
            <Bar dataKey="contributions" fill={COLORS.purple}>
                {chartData.developerData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[Object.keys(COLORS)[index % Object.keys(COLORS).length]]} />
                ))}
            </Bar>
            </BarChart>
        </ResponsiveContainer>
    )

}

export { TopContributorsContent }