// ref: https://www.freecodecamp.org/news/how-to-set-up-jest-enzyme-like-a-boss-8455a2bc6d56/

module.exports = {
    clearMocks: true, // clear mock calls and instances between tests
    collectCoverageFrom: ['src/**/*.{js,jsx}'],
    coverageDirectory: 'coverage',
    moduleFileExtensions: ['js', 'jsx'],
    testMatch: ['**/?(*.)+(test).js?(x)'],
    testPathIgnorePatterns: ['\\\\node_modules\\\\'],
    // enzyme set up 
    setupFilesAfterEnv: ['jest-enzyme'],
    testEnvironment: 'enzyme',
    testEnvironmentOptions: {
        enzymeAdapter: 'react16'
    },
}