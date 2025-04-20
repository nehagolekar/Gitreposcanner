import * as React from "react"
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Users, GitMerge } from 'lucide-react'
import { TopContributorsContent } from "./topContributorsContent"
import { PROverviewContent } from "./prOverviewContent"

function TeamPerformanceCard(props) {
    let formattedData = props.formattedData;
    let chartData = props.chartData;
    let title = props.title;
    let colors = props.colors
    return (
        <Card className="bg-gray-800/50 backdrop-blur border-gray-700">
          <CardHeader>
            <CardTitle className="flex items-center text-white gap-2">
              {title == "Top Contributors" && <><Users className="h-5 w-5 text-purple-400" /> {title}</>}
              {title == "Pull Request Overview" && <><GitMerge className="h-5 w-5 text-pink-400" /> {title}</>}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {title == "Top Contributors" && <TopContributorsContent chartData={chartData} colors={colors}/>}
            {title == "Pull Request Overview" && <PROverviewContent formattedData={formattedData} chartData={chartData} colors={colors} />}
          </CardContent>
        </Card>
    )

}

export { TeamPerformanceCard }