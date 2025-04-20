export const extractRepoPath = (url) => {
    const cleanUrl = url.trim().replace(/\/+$/, '')
    const githubPattern = /github\.com[\/:]([^\/]+)\/([^\/\.]+)/
    const githubMatch = cleanUrl.match(githubPattern)
    
    if (githubMatch) {
      return `${githubMatch[1]}/${githubMatch[2]}`
    }
    
    const simplePattern = /^([^\/\s]+)\/([^\/\s]+)$/
    const simpleMatch = cleanUrl.match(simplePattern)
    
    if (simpleMatch) {
      return cleanUrl
    }
    
    return null
}

export const formatApiResponse = (apiData) => {
    // The API sends data in apiData.analysis
    const data = apiData.analysis;  // Extract the analysis part from response
    
    // Now structure the API response to match the expected format
    return {
      repositoryAnalytics: {
        commitFrequency: {
          hourlyFrequency: data?.repositoryAnalytics?.commitFrequency?.hourlyFrequency || Array(24).fill(0),
          dailyFrequency: data?.repositoryAnalytics?.commitFrequency?.dailyFrequency || Array(7).fill(0),
          peakHour: data?.repositoryAnalytics?.commitFrequency?.peakHour || 0,
          peakDay: data?.repositoryAnalytics?.commitFrequency?.peakDay || 0,
        },
        forkStars: {
          forks: data?.repositoryAnalytics?.forkStars?.forks || 0,
          stars: data?.repositoryAnalytics?.forkStars?.stars || 0,
          watchers: data?.repositoryAnalytics?.forkStars?.watchers || 0,
        },
      },
      qualityMetrics: {
        codeDuplication: {
          totalDuplicates: data?.qualityMetrics?.codeDuplication?.totalDuplicates || 0,
          duplicates: data?.qualityMetrics?.codeDuplication?.duplicates || [],
        },
        testCoverage: {
          testFilesCount: data?.qualityMetrics?.testCoverage?.testFilesCount || 0,
          sourceFilesCount: data?.qualityMetrics?.testCoverage?.sourceFilesCount || 0,
          coverage: data?.qualityMetrics?.testCoverage?.coverage || "0.00",
        },
        docCoverage: {
          docFilesCount: data?.qualityMetrics?.docCoverage?.docFilesCount || 0,
          totalFiles: data?.qualityMetrics?.docCoverage?.totalFiles || 0,
          coverage: data?.qualityMetrics?.docCoverage?.coverage || "0.00",
        },
        codeComplexity: {
          averageComplexity: data?.qualityMetrics?.codeComplexity?.averageComplexity || 0,
        },
      },
      teamPerformance: {
        developerProductivity: data?.teamPerformance?.developerProductivity || [],
        reviewEfficiency: {
          totalPRs: data?.teamPerformance?.reviewEfficiency?.totalPRs || 0,
          reviewedPRs: data?.teamPerformance?.reviewEfficiency?.reviewedPRs || 0,
          reviewRate: data?.teamPerformance?.reviewEfficiency?.reviewRate || "0.00",
        },
        bugFixFrequency: {
          totalBugs: data?.teamPerformance?.bugFixFrequency?.totalBugs || 0,
          fixedBugs: data?.teamPerformance?.bugFixFrequency?.fixedBugs || 0,
          fixRate: data?.teamPerformance?.bugFixFrequency?.fixRate || "0.00",
        },
      },
      issueManagement: {
        openIssues: data?.issueManagement?.openIssues || 0,
        closedIssues: data?.issueManagement?.closedIssues || 0,
        averageTimeToClose: data?.issueManagement?.averageTimeToClose || "0",
      },
      pullRequestAnalysis: {
        openPRs: data?.pullRequestAnalysis?.openPRs || 0,
        mergedPRs: data?.pullRequestAnalysis?.mergedPRs || 0,
        averageTimeToMerge: data?.pullRequestAnalysis?.averageTimeToMerge || "0",
      },
      releaseManagement: {
        totalReleases: data?.releaseManagement?.totalReleases || 0,
        latestRelease: data?.releaseManagement?.latestRelease || "none",
      },
      cicd: {
        cicdConfigured: data?.cicdCheck?.cicdConfigured || false,
        workflows: data?.cicdCheck?.workflows || [],
      },
    }
}

export const formatChartData = (formattedData) => {
  if (!formattedData) return {
    hourlyCommitData: [],
    dailyCommitData: [],
    developerData: [],
    issueData: [],
    prData: []
  }

  const hourlyCommitData = formattedData.repositoryAnalytics.commitFrequency.hourlyFrequency.map((value, hour) => ({
    hour: `${hour.toString().padStart(2, '0')}:00`,
    commits: value,
  }))

  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
  const dailyCommitData = formattedData.repositoryAnalytics.commitFrequency.dailyFrequency.map((value, index) => ({
    day: days[index],
    commits: value,
  }))

  const developerData = formattedData.teamPerformance.developerProductivity
    .sort((a, b) => b.contributions - a.contributions)
    .slice(0, 5)

  const issueData = [
    { name: 'Open Issues', value: formattedData.issueManagement.openIssues },
    { name: 'Closed Issues', value: formattedData.issueManagement.closedIssues },
  ]

  const prData = [
    { name: 'Open PRs', value: formattedData.pullRequestAnalysis.openPRs },
    { name: 'Merged PRs', value: formattedData.pullRequestAnalysis.mergedPRs },
  ]

  return {
    hourlyCommitData,
    dailyCommitData,
    developerData,
    issueData,
    prData
  }
}

export const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];