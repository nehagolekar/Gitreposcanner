const axios = require('axios');
const { parseGithubUrl, formatOutput } = require("./helper")
const repositoryAnalyticsService = require("./services/repositoryAnalytics")
const qualityMetricsService = require("./services/qualityMetrics")
const teamPerformanceService = require("./services/teamPerformance")
const dependencyAnalysisService = require("./services/dependencyAnalysis")
const issueManagementService = require("./services/issueManagement")
const pullRequestAnalysisService = require("./services/pullRequestAnalysis")
const releaseManagementService = require("./services/releaseManagement")
const cicdCheckService = require("./services/cicdCheck")

class ComprehensiveGithubAnalyzer {
    constructor(urls) {
        this.urls = urls;
        this.api = axios.create({
            baseURL: 'https://api.github.com',
            headers: {
                'Accept': 'application/vnd.github.v3+json'
            }
        });
    }

    // Main Analysis
    async analyzeRepository(url) {
        const repoInfo = parseGithubUrl(url);
        if (!repoInfo) return null;

        const { owner, repo } = repoInfo;
        console.log(`\nAnalyzing repository: ${owner}/${repo}\n`);

        try {
            const [
                repositoryAnalytics,
                qualityMetrics,
                teamPerformance,
                dependencyAnalysis,
                issueManagement,
                pullRequestAnalysis,
                releaseManagement,
                cicdCheck
            ] = await Promise.all([
                repositoryAnalyticsService(this.api, owner, repo),
                qualityMetricsService(this.api, owner, repo),
                teamPerformanceService(this.api, owner, repo),
                dependencyAnalysisService(this.api, owner, repo),
                issueManagementService(this.api, owner, repo),
                pullRequestAnalysisService(this.api, owner, repo),
                releaseManagementService(this.api, owner, repo),
                cicdCheckService(this.api, owner, repo)
            ]);

            const analysis = {
                repositoryAnalytics,
                qualityMetrics,
                teamPerformance,
                dependencyAnalysis,
                issueManagement,
                pullRequestAnalysis,
                releaseManagement,
                cicdCheck
            };

            formatOutput(analysis);
            return analysis;
        } catch (error) {
            console.error('Error during repository analysis:', error.message);
            return null;
        }
    }

    async analyzeAll() {
        for (const url of this.urls) {
            await this.analyzeRepository(url);
        }
    }

}

// // Example Usage
// const githubUrls = ['https://github.com/src-d/hercules'];

// const analyzer = new ComprehensiveGithubAnalyzer(githubUrls);
// analyzer.analyzeAll();
module.exports = { ComprehensiveGithubAnalyzer };
