
const { detailedContributorProductivity, detailedReviewEfficiency, detailedBugFixFrequency, }  = require("../helper");

// Team Performance
teamPerformance = async (api, owner, repo) => {
    try {
        const [pulls, issues, contributors] = await Promise.all([
            api.get(`/repos/${owner}/${repo}/pulls?state=all&per_page=100`),
            api.get(`/repos/${owner}/${repo}/issues?state=all&per_page=100`),
            api.get(`/repos/${owner}/${repo}/contributors?per_page=100`)
        ]);

        const developerProductivity = detailedContributorProductivity(contributors.data);
        const reviewEfficiency = detailedReviewEfficiency(pulls.data);
        const bugFixFrequency = detailedBugFixFrequency(issues.data);

        return {
            developerProductivity,
            reviewEfficiency,
            bugFixFrequency
        };
    } catch (error) {
        console.error('Error in team performance:', error.message);
        return {};
    }
}

module.exports = teamPerformance;