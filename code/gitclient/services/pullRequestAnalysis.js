const { calculateAverageTimeToMerge } = require("../helper");

// New Feature: Pull Request Analysis
pullRequestAnalysis = async(api, owner, repo) => {
    try {
        const pulls = await api.get(`/repos/${owner}/${repo}/pulls?state=all&per_page=100`);
        const openPRs = pulls.data.filter(pr => pr.state === 'open').length;
        const mergedPRs = pulls.data.filter(pr => pr.merged_at).length;
        const averageTimeToMerge = calculateAverageTimeToMerge(pulls.data);

        return {
            openPRs,
            mergedPRs,
            averageTimeToMerge
        };
    } catch (error) {
        console.error('Error in pull request analysis:', error.message);
        return {};
    }
}

module.exports = pullRequestAnalysis;