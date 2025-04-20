// New Feature: CI/CD Check
cicdCheck = async (api, owner, repo) => {
    try {
        const workflows = await api.get(`/repos/${owner}/${repo}/actions/workflows`);
        const cicdConfigured = workflows.data.total_count > 0;
        return {
            cicdConfigured,
            workflows: workflows.data.workflows.map(workflow => ({ name: workflow.name, status: workflow.state }))
        };
    } catch (error) {
        console.error('Error in CI/CD check:', error.message);
        return { cicdConfigured: false };
    }
}

module.exports = cicdCheck;