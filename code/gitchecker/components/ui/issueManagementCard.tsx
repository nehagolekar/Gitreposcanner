import * as React from "react"
import {
  PieChart,
  Pie,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from 'recharts'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { AlertCircle } from 'lucide-react'

function IssueManagementCard(props) {
    let formattedData = props.formattedData;
    let chartData = props.chartData;
    let COLORS = props.colors;

    return (
        <Card className="bg-gray-800/50 backdrop-blur border-gray-700">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-white font-bold">
            <AlertCircle className="h-5 w-5 text-yellow-400" />
            Issue Management Overview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="text-center">
              <p className="text-sm text-gray-400">Average Time to Close</p>
              <p className="text-2xl font-bold text-yellow-400">{formattedData.issueManagement.averageTimeToClose} days</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-400">Issue Resolution Rate</p>
              <p className="text-2xl font-bold text-green-400">
                {((formattedData.issueManagement.closedIssues / (formattedData.issueManagement.openIssues + formattedData.issueManagement.closedIssues)) * 100).toFixed(1)}%
              </p>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-400">Total Issues</p>
              <p className="text-2xl font-bold text-blue-400">
                {formattedData.issueManagement.openIssues + formattedData.issueManagement.closedIssues}
              </p>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={chartData.issueData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
              >
                {chartData.issueData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={index === 0 ? COLORS.red : COLORS.green} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{ backgroundColor: '#1F2937', border: 'none', color: '#fff' }}
              />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    )

}

export { IssueManagementCard }