// New Feature: Dependency Analysis
dependencyAnalysis = async (api, owner, repo) => {
    try {
        const packageFiles = ['/package.json', '/requirements.txt'];
        const dependencies = [];

        for (const file of packageFiles) {
            try {
                const response = await api.get(`/repos/${owner}/${repo}/contents${file}`);
                const content = Buffer.from(response.data.content, 'base64').toString();
                dependencies.push({ file, content });
            } catch (error) {
                // Skip if file is not found
            }
        }

        return dependencies.length > 0 ? dependencies : 'No dependency files found';
    } catch (error) {
        console.error('Error in dependency analysis:', error.message);
        return {};
    }
}

module.exports = dependencyAnalysis;