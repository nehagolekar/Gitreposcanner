import * as React from "react"
import { Card, CardContent } from '@/components/ui/card'
import { Star, GitFork, Eye, GitPullRequest, AlertCircle } from 'lucide-react'

function RepositoryOverviewCard(data) {
    let formattedDataObj = data.data.formattedData;
    let Id = data.id
    let h3Value;
    if (Id == "Stars") {
        h3Value = formattedDataObj.repositoryAnalytics.forkStars.stars.toLocaleString();
    } else if (Id == "Forks") {
        h3Value = formattedDataObj.repositoryAnalytics.forkStars.forks.toLocaleString();
    } else if (Id == "Watchers") {
        h3Value = formattedDataObj.repositoryAnalytics.forkStars.watchers.toLocaleString();
    } else if (Id == "Open PRs") {
        h3Value = formattedDataObj.pullRequestAnalysis.openPRs;
    } else if (Id == "Open Issues") {
        h3Value = formattedDataObj.issueManagement.openIssues;
    } else if (Id == "Latest Release") {
        h3Value = formattedDataObj.releaseManagement.latestRelease;
    }
    return (
        <Card className="bg-gray-800/50 backdrop-blur border-gray-700">
            <CardContent className="flex items-center p-6">
                {Id == "Stars" && (<Star className="h-8 w-8 text-yellow-400 mr-4" />)}
                {Id == "Forks" && (<GitFork className="h-8 w-8 text-blue-400 mr-4" />)}
                {Id == "Watchers" && (<Eye className="h-8 w-8 text-green-400 mr-4" />)}
                {Id == "Open PRs" && (<GitPullRequest className="h-8 w-8 text-purple-400 mr-4" />)}
                {Id == "Open Issues" && (<AlertCircle className="h-8 w-8 text-red-400 mr-4" />)}
                <div>
                    <p className="text-sm text-gray-400 ">{Id}</p>
                    <h3 className="text-2xl font-bold text-white font-bold">{h3Value}</h3>
                </div>
            </CardContent>
        </Card>
    );
}

export { RepositoryOverviewCard };