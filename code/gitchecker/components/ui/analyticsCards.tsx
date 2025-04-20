// /components/ui/analyticsCards.tsx

import React from 'react'
import { Shield, GitBranch, AlertTriangle, Code, Box, Users } from 'lucide-react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'

interface AnalyticsCardProps {
  formattedData: any; // You should define a proper type for your data structure
}

export const SecurityOverviewCard: React.FC<AnalyticsCardProps> = ({ formattedData }) => {
  return (
    <Card className="bg-gray-800/50 border-gray-700">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium flex items-center">
          <Shield className="w-4 h-4 mr-2 text-blue-400" />
          Security Overview
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Environment Check</span>
            <span className="text-green-400">{formattedData.envLeaks || "✅ Secure"}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span>Security Alerts</span>
            <span className="text-yellow-400">{formattedData.securityAlerts?.length || 0}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span>License</span>
            <span className="text-blue-400">{formattedData.license || "N/A"}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export const CodeChurnCard: React.FC<AnalyticsCardProps> = ({ formattedData }) => {
  const churnData = formattedData.codeChurn || {}
  return (
    <Card className="bg-gray-800/50 border-gray-700">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium flex items-center">
          <GitBranch className="w-4 h-4 mr-2 text-purple-400" />
          Code Churn
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Added Lines</span>
            <span className="text-green-400">+{churnData.totalAdditions || 0}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span>Deleted Lines</span>
            <span className="text-red-400">-{churnData.totalDeletions || 0}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span>Net Change</span>
            <span className={churnData.netChange >= 0 ? "text-green-400" : "text-red-400"}>
              {churnData.netChange || 0}
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span>Avg Change/Commit</span>
            <span className="text-blue-400">{churnData.averageChangePerCommit || "0.00"}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export const DevelopmentMetricsCard: React.FC<AnalyticsCardProps> = ({ formattedData }) => {
  const qualityMetrics = formattedData.qualityMetrics || {}
  return (
    <Card className="bg-gray-800/50 border-gray-700">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium flex items-center">
          <Code className="w-4 h-4 mr-2 text-yellow-400" />
          Development Metrics
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span>Lint Configuration</span>
              <span className={qualityMetrics.lintIssues?.hasLintConfig ? "text-green-400" : "text-red-400"}>
                {qualityMetrics.lintIssues?.hasLintConfig ? "Configured" : "Not Found"}
              </span>
            </div>
          </div>
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span>Unused Files</span>
              <span className="text-yellow-400">{qualityMetrics.unusedCode?.totalUnusedFiles || 0}</span>
            </div>
            {qualityMetrics.unusedCode?.unusedFiles?.length > 0 && (
              <div className="text-xs text-gray-400 mt-1">
                Top unused: {qualityMetrics.unusedCode.unusedFiles[0]}
              </div>
            )}
          </div>
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span>Dependencies</span>
              <span className="text-blue-400">{formattedData.dependencyAnalysis || "Not Found"}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export const TeamMetricsCard: React.FC<AnalyticsCardProps> = ({ formattedData }) => {
  const teamData = formattedData.teamPerformance || {}
  return (
    <Card className="bg-gray-800/50 border-gray-700">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium flex items-center">
          <Users className="w-4 h-4 mr-2 text-green-400" />
          Team Metrics
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span>PR Review Rate</span>
              <span className="text-blue-400">{teamData.reviewEfficiency?.reviewRate || "0%"}</span>
            </div>
            <Progress 
              value={parseFloat(teamData.reviewEfficiency?.reviewRate) || 0} 
              className="h-1 bg-gray-700" 
            />
          </div>
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span>Bug Fix Rate</span>
              <span className="text-green-400">{teamData.bugFixFrequency?.fixRate || "0%"}</span>
            </div>
            <Progress 
              value={parseFloat(teamData.bugFixFrequency?.fixRate) || 0} 
              className="h-1 bg-gray-700" 
            />
          </div>
          <div>
            <div className="flex justify-between text-sm">
              <span>CI/CD Status</span>
              <span className="text-green-400">
                {formattedData.cicd?.cicdConfigured ? `Active (${formattedData.cicd.workflows.length} workflows)` : "Not Configured"}
              </span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}