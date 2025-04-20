const { calculateAverageTimeToClose } = require("../helper");

// New Feature: Issue Management Analysis
issueManagement = async (api, owner, repo) => {
    try {
        const issues = await api.get(`/repos/${owner}/${repo}/issues?state=all&per_page=100`);
        const openIssues = issues.data.filter(issue => issue.state === 'open').length;
        const closedIssues = issues.data.filter(issue => issue.state === 'closed').length;
        const averageTimeToClose = calculateAverageTimeToClose(issues.data);

        return {
            openIssues,
            closedIssues,
            averageTimeToClose
        };
    } catch (error) {
        console.error('Error in issue management analysis:', error.message);
        return {};
    }
}

module.exports = issueManagement;