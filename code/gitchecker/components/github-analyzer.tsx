'use client'

import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Search, Github, Activity} from 'lucide-react'
import { RepositoryOverviewCard } from '@/components/ui/repositoryOverviewCard'
import { CommitActivityCard } from '@/components/ui/commitActivityCard';
import { extractRepoPath, formatApiResponse, formatChartData } from './helpers'
import { CodeQualitySectionCard } from './ui/codeQualitySectionCard'
import { TeamPerformanceCard } from './ui/teamPerformanceCard'
import { IssueManagementCard } from './ui/issueManagementCard'
import { 
  SecurityOverviewCard, 
  CodeChurnCard, 
  DevelopmentMetricsCard, 
  TeamMetricsCard 
} from '@/components/ui/analyticsCards'

export default function GithubAnalyzer() {
  const [showDashboard, setShowDashboard] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [repoUrl, setRepoUrl] = useState('')
  const [error, setError] = useState(null)
  const [formattedData, setFormattedData] = useState(null)

  const handleAnalyze = async () => {
    console.log('Analyze button clicked')
    setIsLoading(true)
    setError(null)

    const repoPath = extractRepoPath(repoUrl)
    console.log('Extracted repo path:', repoPath)

    if (!repoPath) {
      setError("Please enter a valid GitHub repository path")
      setIsLoading(false)
      return
    }

    try {
      const apiUrl = `http://localhost:3002/api/analyze?github=${encodeURIComponent(repoPath)}`
      console.log('Fetching from:', apiUrl)
      
      const response = await fetch(apiUrl)
      const apiData = await response.json()
      
      console.log('API Response:', apiData) // Log the raw API response

      if (!response.ok) {
        throw new Error(apiData.message || 'Failed to analyze repository')
      }

      const formatted = formatApiResponse(apiData)
      console.log('Formatted Data:', formatted) // Log the formatted data
      
      setFormattedData(formatted)
      setShowDashboard(true)
    } catch (err) {
      console.error('Error during analysis:', err)
      setError(err.message || 'Failed to analyze repository')
      setShowDashboard(false)
    } finally {
      setIsLoading(false)
    }
  }

  // Vibrant colors for dark theme
  const COLORS = {
    blue: '#60A5FA',
    green: '#34D399',
    red: '#F87171',
    purple: '#A78BFA',
    pink: '#F472B6',
    yellow: '#FBBF24',
    orange: '#FB923C',
  }

  const chartData = formatChartData(formattedData)

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-white">
      <div className="container mx-auto px-4 py-8">
        {/* Title and Search Section */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-6">
            {/* <Github className="w-12 h-12 text-blue-400 mr-4" /> */}
            <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-violet-400">
              Git Repo Analyzer
            </h1>
          </div>
          <div className="max-w-2xl mx-auto space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <Input
                type="text"
                value={repoUrl}
                onChange={(e) => setRepoUrl(e.target.value)}
                placeholder="Enter GitHub repository (e.g., facebook/react)"
                className="w-full pl-10 bg-gray-800/50 border-gray-700 focus:border-blue-500 text-white placeholder:text-gray-400"
              />
            </div>
            <Button
              onClick={handleAnalyze}
              className="w-full sm:w-auto px-8 py-2 bg-blue-600 hover:bg-blue-700 text-white transition-all duration-200 ease-in-out transform hover:scale-105"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Activity className="mr-2 h-4 w-4 animate-spin" />
                  Analyzing Repository...
                </>
              ) : (
                'Analyze Repository'
              )}
            </Button>
          </div>
        </div>

        {showDashboard && formattedData && (() => {
  // Format chart data only when formattedData exists
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const chartData = {
    hourlyCommitData: formattedData.repositoryAnalytics.commitFrequency.hourlyFrequency.map((value, hour) => ({
      hour: `${hour.toString().padStart(2, '0')}:00`,
      commits: value,
    })),
    dailyCommitData: formattedData.repositoryAnalytics.commitFrequency.dailyFrequency.map((value, index) => ({
      day: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][index],
      commits: value,
    })),
    developerData: formattedData.teamPerformance.developerProductivity
      .sort((a, b) => b.contributions - a.contributions)
      .slice(0, 5),
    issueData: [
      { name: 'Open Issues', value: formattedData.issueManagement.openIssues },
      { name: 'Closed Issues', value: formattedData.issueManagement.closedIssues },
    ],
    prData: [
      { name: 'Open PRs', value: formattedData.pullRequestAnalysis.openPRs },
      { name: 'Merged PRs', value: formattedData.pullRequestAnalysis.mergedPRs },
    ]
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Repository Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-4">
        <RepositoryOverviewCard data = {{formattedData}} id = "Stars" />
        <RepositoryOverviewCard data = {{formattedData}} id = "Forks" />
        <RepositoryOverviewCard data = {{formattedData}} id = "Watchers" />
        <RepositoryOverviewCard data = {{formattedData}} id = "Open PRs" />
        <RepositoryOverviewCard data = {{formattedData}} id = "Open Issues" />
        <RepositoryOverviewCard data = {{formattedData}} id = "Latest Release" />
      </div>

      {/* Commit Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <CommitActivityCard formattedData={formattedData} title="Hourly Commit Frequency" description="Peak hour" chartData={chartData} colors={COLORS} dataKeyX="hour" barDataKey="commits" />
        <CommitActivityCard formattedData={formattedData} title="Daily Commit Activity" description="Peak day" chartData={chartData} colors={COLORS} dataKeyX="day" barDataKey="commits" /> 
      </div>

      {/* Code Quality Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <CodeQualitySectionCard formattedData={formattedData} title="Test Coverage" /> 
        <CodeQualitySectionCard formattedData={formattedData} title="Documentation Coverage" /> 
        <CodeQualitySectionCard formattedData={formattedData} title="Code Duplication" /> 
        <CodeQualitySectionCard formattedData={formattedData} title="Code Complexity" /> 
      </div>

      {/* Team Performance */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <TeamPerformanceCard title="Top Contributors" formattedData={formattedData} chartData={chartData} colors={COLORS} />
        <TeamPerformanceCard title="Pull Request Overview" formattedData={formattedData} chartData={chartData} colors={COLORS} />
      </div>
      {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <SecurityOverviewCard formattedData={formattedData} />
        <CodeChurnCard formattedData={formattedData} />
        <DevelopmentMetricsCard formattedData={formattedData} />
        <TeamMetricsCard formattedData={formattedData} />
      </div> */}

      {/* Issue Management */}
      <IssueManagementCard formattedData={formattedData} chartData={chartData} colors={COLORS} />
    </div>
  );
})()}
      </div>
    </div>
  )
}

