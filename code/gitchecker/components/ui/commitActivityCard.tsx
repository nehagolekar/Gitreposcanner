import * as React from "react"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { days } from '../helpers'

function CommitActivityCard(props) {
  let formattedData = props.formattedData || {};
  let cardTitle = props.title || "";
  let cardDescription = props.description || "";
  let chartData = props.chartData || {};
  let COLORS = props.colors || {};
  let dataKeyX = props.dataKeyX || "";
  let barDataKey = props.barDataKey || "";
  let cardDescriptionValue;
  let description;
  let barChartData;
  let color;

  if(cardTitle == "Hourly Commit Frequency") {
    cardDescriptionValue = formattedData.repositoryAnalytics.commitFrequency.peakHour;
    description = cardDescription + " : " + cardDescriptionValue + ":00";
    barChartData = chartData.hourlyCommitData;
    color = COLORS.blue;
  } else if (cardTitle = "Daily Commit Activity") {
    cardDescriptionValue = days[formattedData.repositoryAnalytics.commitFrequency.peakDay];
    description = cardDescription + " : " + cardDescriptionValue;
    barChartData = chartData.dailyCommitData;
    color = COLORS.green;
  }

    return (
        <Card className="bg-gray-800/50 backdrop-blur border-gray-700">
          <CardHeader>
            <CardTitle className="text-white">
              {cardTitle}
            </CardTitle>
              <CardDescription className="text-gray-400">
                {description}
              </CardDescription>
          </CardHeader>
          <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={barChartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey={dataKeyX} stroke="#9CA3AF" />
                  <YAxis stroke="#9CA3AF" />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#1F2937', border: 'none', color: '#fff' }}
                    cursor={{ fill: 'rgba(96, 165, 250, 0.1)' }}
                  />
                  <Bar dataKey={barDataKey} fill={color} />
                </BarChart>
              </ResponsiveContainer>
          </CardContent>
        </Card>
    )
}

export { CommitActivityCard };