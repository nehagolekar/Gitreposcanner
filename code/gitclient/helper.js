const fs = require('fs');

function parseGithubUrl(url) {
    url = url.replace(/\/$/, '');
    const githubRegex = /github\.com\/([^\/]+)\/([^\/]+)/;
    const match = url.match(githubRegex);
    return match ? { owner: match[1], repo: match[2].replace('.git', '') } : null;
}

function calculateAverageTimeToClose(issues) {
    const closedIssues = issues.filter(issue => issue.state === 'closed' && issue.closed_at);
    const totalCloseTime = closedIssues.reduce((acc, issue) => acc + (new Date(issue.closed_at) - new Date(issue.created_at)), 0);
    return closedIssues.length > 0 ? (totalCloseTime / closedIssues.length / (1000 * 60 * 60 * 24)).toFixed(2) + ' days' : 'N/A';
}

function detailedCommitFrequency(commits) {
    const hours = commits.map(commit => new Date(commit.commit.author.date).getHours());
    const days = commits.map(commit => new Date(commit.commit.author.date).getDay());

    const hourlyFrequency = Array(24).fill(0);
    const dailyFrequency = Array(7).fill(0);

    hours.forEach(hour => hourlyFrequency[hour]++);
    days.forEach(day => dailyFrequency[day]++);

    return {
        hourlyFrequency,
        dailyFrequency,
        peakHour: hourlyFrequency.indexOf(Math.max(...hourlyFrequency)),
        peakDay: dailyFrequency.indexOf(Math.max(...dailyFrequency))
    };
}

function detailedCodeChurn(commits) {
    let totalAdditions = 0, totalDeletions = 0, commitChanges = [];

    commits.forEach(commit => {
        if (commit.stats) {
            totalAdditions += commit.stats.additions;
            totalDeletions += commit.stats.deletions;
            commitChanges.push({
                sha: commit.sha,
                additions: commit.stats.additions,
                deletions: commit.stats.deletions
            });
        }
    });

    return {
        totalAdditions,
        totalDeletions,
        netChange: totalAdditions - totalDeletions,
        averageChangePerCommit: ((totalAdditions + totalDeletions) / commits.length).toFixed(2),
        commitChanges
    };
}

function detailedDuplication(files) {
    const seenFiles = new Map();
    const duplicateFiles = [];
    files.forEach(file => {
        const fileName = file.split('/').pop();
        if (seenFiles.has(fileName)) duplicateFiles.push(fileName);
        else seenFiles.set(fileName, true);
    });
    return {
        totalDuplicates: duplicateFiles.length,
        duplicates: duplicateFiles
    };
}

function detailedTestCoverage(files) {
    const testFiles = files.filter(file => file.includes('.test.') || file.includes('.spec.'));
    const sourceFiles = files.filter(file => file.endsWith('.js') || file.endsWith('.py'));

    const coverage = ((testFiles.length / sourceFiles.length) * 100).toFixed(2);

    return {
        testFilesCount: testFiles.length,
        sourceFilesCount: sourceFiles.length,
        coverage: `${coverage}%`
    };
}

function detailedDocCoverage(files) {
    const docFiles = files.filter(file => file.endsWith('.md') || file.includes('docs'));
    const coverage = ((docFiles.length / files.length) * 100).toFixed(2);
    return {
        docFilesCount: docFiles.length,
        totalFiles: files.length,
        coverage: `${coverage}%`
    };
}

function detailedLintIssues(files) {
    const lintConfigs = ['.eslintrc', '.prettierrc', '.stylelintrc'];
    const foundConfigs = lintConfigs.filter(config => files.includes(config));
    return {
        hasLintConfig: foundConfigs.length > 0,
        foundConfigs
    };
}

function detailedUnusedCode(files) {
    const unusedExtensions = ['.tmp', '.bak', '.old'];
    const unusedFiles = files.filter(file => unusedExtensions.some(ext => file.endsWith(ext)));
    return {
        totalUnusedFiles: unusedFiles.length,
        unusedFiles
    };
}

async function detailedCodeComplexity(owner, repo) {
    // Placeholder for analyzing complexity; replace with actual logic
    return {
        averageComplexity: Math.random() * 10, // Simulating average complexity
        details: 'Placeholder for actual complexity analysis'
    };
}

function detailedContributorProductivity(contributors) {
    return contributors.map(c => ({
        username: c.login,
        contributions: c.contributions,
        active: c.contributions > 0
    }));
}

function detailedReviewEfficiency(pulls) {
    const reviewedPRs = pulls.filter(pr => pr.review_comments > 0);
    return {
        totalPRs: pulls.length,
        reviewedPRs: reviewedPRs.length,
        reviewRate: `${((reviewedPRs.length / pulls.length) * 100).toFixed(2)}%`
    };
}

function detailedBugFixFrequency(issues) {
    const bugs = issues.filter(issue => issue.labels.some(label => label.name.toLowerCase().includes('bug')));
    const fixedBugs = bugs.filter(bug => bug.state === 'closed');
    return {
        totalBugs: bugs.length,
        fixedBugs: fixedBugs.length,
        fixRate: `${((fixedBugs.length / bugs.length) * 100).toFixed(2)}%`
    };
}

function calculateAverageTimeToMerge(pulls) {
    const mergedPRs = pulls.filter(pr => pr.merged_at);
    const totalMergeTime = mergedPRs.reduce((acc, pr) => acc + (new Date(pr.merged_at) - new Date(pr.created_at)), 0);
    return mergedPRs.length > 0 ? (totalMergeTime / mergedPRs.length / (1000 * 60 * 60 * 24)).toFixed(2) + ' days' : 'N/A';
}

// Output Formatting
function formatOutput(analysis) {
    const result = {
        repositoryAnalytics: analysis.repositoryAnalytics,
        qualityMetrics: analysis.qualityMetrics,
        teamPerformance: analysis.teamPerformance,
        dependencyAnalysis: analysis.dependencyAnalysis,
        issueManagement: analysis.issueManagement,
        pullRequestAnalysis: analysis.pullRequestAnalysis,
        releaseManagement: analysis.releaseManagement,
        cicdCheck: analysis.cicdCheck
    };

    // Log to console for quick debugging and insights
    console.log('\n=== Repository Analysis ===');
    console.log('\nRepository Analytics:', JSON.stringify(result.repositoryAnalytics, null, 2));
    console.log('\nQuality Metrics:', JSON.stringify(result.qualityMetrics, null, 2));
    console.log('\nTeam Performance:', JSON.stringify(result.teamPerformance, null, 2));
    console.log('\nDependency Analysis:', JSON.stringify(result.dependencyAnalysis, null, 2));
    console.log('\nIssue Management:', JSON.stringify(result.issueManagement, null, 2));
    console.log('\nPull Request Analysis:', JSON.stringify(result.pullRequestAnalysis, null, 2));
    console.log('\nRelease Management:', JSON.stringify(result.releaseManagement, null, 2));
    console.log('\nCI/CD Check:', JSON.stringify(result.cicdCheck, null, 2));
    console.log('\n=============================\n');

    // Return as JSON response
    return result;
}

// Save Result to File
async function saveResultToFile(result, filename) {
    try {
        await fs.promises.writeFile(filename, JSON.stringify(result, null, 2));
        console.log(`Analysis result saved to ${filename}`);
    } catch (err) {
        console.error('Error saving result to file:', err);
    }
}

module.exports = { 
    parseGithubUrl, 
    calculateAverageTimeToClose, 
    detailedCommitFrequency, 
    detailedCodeChurn, 
    detailedDuplication, 
    detailedTestCoverage,
    detailedDocCoverage,
    detailedLintIssues,
    detailedUnusedCode,
    detailedCodeComplexity,
    detailedContributorProductivity,
    detailedReviewEfficiency,
    detailedBugFixFrequency,
    calculateAverageTimeToMerge,
    formatOutput,
    saveResultToFile
}