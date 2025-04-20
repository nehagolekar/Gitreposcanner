import * as React from "react"
import {
  PieChart,
  Pie,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from 'recharts'

function PROverviewContent(props) {
    let formattedData = props.formattedData;
    let chartData = props.chartData;
    let COLORS = props.colors;
    return (
        <>
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="text-center">
                <p className="text-sm text-gray-400">Average Time to Merge</p>
                <p className="text-2xl font-bold text-pink-400">{formattedData.pullRequestAnalysis.averageTimeToMerge} days</p>
              </div>
              <div className="text-center">
                <p className="text-sm text-gray-400">PR Success Rate</p>
                <p className="text-2xl font-bold text-green-400">
                  {((formattedData.pullRequestAnalysis.mergedPRs / (formattedData.pullRequestAnalysis.mergedPRs + formattedData.pullRequestAnalysis.openPRs)) * 100).toFixed(1)}%
                </p>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={chartData.prData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {chartData.prData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={index === 0 ? COLORS.orange : COLORS.green} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{ backgroundColor: '#1F2937', border: 'none', color: '#fff' }}
                />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
        </>
    )

}

export { PROverviewContent }