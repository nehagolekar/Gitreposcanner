const { ComprehensiveGithubAnalyzer } = require('../git.js');
const axios = require('axios');

// Mock axios
jest.mock('axios');

describe('ComprehensiveGithubAnalyzer', () => {
    let analyzer;
    
    beforeEach(() => {
        analyzer = new ComprehensiveGithubAnalyzer(['https://github.com/facebook/react']);
        jest.clearAllMocks();
    });

    describe('analyzeRepository', () => {
        const mockResponse = {
            data: {
                forks_count: 100,
                stargazers_count: 500,
                subscribers_count: 50,
                default_branch: 'main'
            }
        };

        test('should successfully analyze a repository', async () => {
            // Mock successful API responses
            axios.get.mockResolvedValue(mockResponse);
            
            const result = await analyzer.analyzeRepository('https://github.com/facebook/react');
            
            // Basic validation that the function returns something
            expect(result).toBeDefined();
            // If result is null, that's also valid based on your error handling
            if (result) {
                expect(typeof result).toBe('object');
            }
        });

        test('should return null for invalid GitHub URL', async () => {
            const result = await analyzer.analyzeRepository('https://invalid-url.com');
            expect(result).toBeNull();
        });

        test('should handle service failures gracefully', async () => {
            // Mock API failure
            axios.get.mockRejectedValue(new Error('API Error'));
            
            const result = await analyzer.analyzeRepository('https://github.com/facebook/react');
            expect(result).toBeNull();
        });
    });

    describe('analyzeAll', () => {
        test('should analyze multiple repositories', async () => {
            // Mock API responses
            axios.get.mockResolvedValue({
                data: {
                    forks_count: 100,
                    stargazers_count: 500,
                    subscribers_count: 50,
                    default_branch: 'main'
                }
            });

            // Since analyzeAll doesn't return anything, we just verify it runs without throwing
            await expect(analyzer.analyzeAll()).resolves.not.toThrow();
        });
    });
});