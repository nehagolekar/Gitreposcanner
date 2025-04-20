// New Feature: Release Management Analysis 
releaseManagement = async (api, owner, repo) => {
    try {
        const releases = await api.get(`/repos/${owner}/${repo}/releases`);
        const releaseFrequency = releases.data.length;

        return {
            totalReleases: releaseFrequency,
            latestRelease: releases.data[0]?.tag_name || 'No releases'
        };
    } catch (error) {
        console.error('Error in release management analysis:', error.message);
        return {};
    }
}

module.exports = releaseManagement;