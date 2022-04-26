// eslint-disable-next-line @typescript-eslint/no-var-requires,no-undef
const jestConfig = require('./jest.config.js');

delete jestConfig.testPathIgnorePatterns;

// eslint-disable-next-line no-undef
module.exports = {
    ...jestConfig,
    testTimeout: 30000,
    testMatch: ['**/persistence/**/*.test.ts']
};
