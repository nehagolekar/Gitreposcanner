
const { detailedCommitFrequency, detailedCodeChurn }  = require("../helper");
const getSecurityAlerts = require("./getSecurityAlerts");

// Repository Analytics
repositoryAnalyticsService = async (api, owner, repo) => {
    try {
        const [commits, files, license, repoData, securityAlerts] = await Promise.all([
            api.get(`/repos/${owner}/${repo}/commits?per_page=100`),
            api.get(`/repos/${owner}/${repo}/git/trees/main?recursive=1`).catch(() =>
                api.get(`/repos/${owner}/${repo}/git/trees/master?recursive=1`)
            ),
            api.get(`/repos/${owner}/${repo}/license`).catch(() => null),
            api.get(`/repos/${owner}/${repo}`),
            getSecurityAlerts(api, owner, repo)
        ]);

        const commitFrequency = detailedCommitFrequency(commits.data);
        const codeChurn = detailedCodeChurn(commits.data);
        const envLeaks = files.data.tree.some(file => file.path.includes('.env'));
        const forkStars = {
            forks: repoData.data.forks_count,
            stars: repoData.data.stargazers_count,
            watchers: repoData.data.subscribers_count
        };

        return {
            commitFrequency,
            codeChurn,
            envLeaks: envLeaks ? '⚠️ .env file detected (potential security risk)' : '✅ No .env file detected.',
            license: license?.data?.license?.name || 'No license detected',
            forkStars,
            securityAlerts
        };
    } catch (error) {
        console.error('Error in repository analytics:', error.message);
        return {};
    }
}

module.exports = repositoryAnalyticsService;