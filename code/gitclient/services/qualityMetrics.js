const { detailedDuplication, detailedTestCoverage, detailedDocCoverage, detailedLintIssues, detailedUnusedCode, detailedCodeComplexity, }  = require("../helper");

// Quality Metrics
qualityMetrics = async (api, owner, repo) => {
    try {
        const files = await api.get(`/repos/${owner}/${repo}/git/trees/main?recursive=1`).catch(() =>
            api.get(`/repos/${owner}/${repo}/git/trees/master?recursive=1`)
        );

        const filePaths = files.data.tree.map(file => file.path);

        const codeDuplication = detailedDuplication(filePaths);
        const testCoverage = detailedTestCoverage(filePaths);
        const docCoverage = detailedDocCoverage(filePaths);
        const lintIssues = detailedLintIssues(filePaths);
        const unusedCode = detailedUnusedCode(filePaths);
        const codeComplexity = await detailedCodeComplexity(owner, repo);

        return {
            codeDuplication,
            testCoverage,
            docCoverage,
            lintIssues,
            unusedCode,
            codeComplexity
        };
    } catch (error) {
        console.error('Error in quality metrics:', error.message);
        return {};
    }
}

module.exports = qualityMetrics;