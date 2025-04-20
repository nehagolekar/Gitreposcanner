getSecurityAlerts = async(api, owner, repo) => {
    try {
        const response = await api.get(`/repos/${owner}/${repo}/vulnerability-alerts`, {
            headers: { Accept: 'application/vnd.github.dorian-preview+json' }
        });
        return response.data || [];
    } catch (error) {
        return [];
    }
}

module.exports = getSecurityAlerts;