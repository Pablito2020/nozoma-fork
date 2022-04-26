// eslint-disable-next-line no-undef
module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    cacheDirectory: '.tmp/jestCache',
    moduleNameMapper: {
        '@shared/(.*)$': '<rootDir>/src/contexts/shared/$1',
        '@backoffice-contexts/(.*)$': '<rootDir>/src/contexts/backoffice/$1',
        '@pms-contexts/(.*)$': '<rootDir>/src/contexts/pms/$1'
    },
    testPathIgnorePatterns: ['<rootDir>/(.*)/persistence/(.*)']
};
