import type { Config } from 'jest';
import nextJest from 'next/jest.js';

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: './',
});

// Add any custom config to be passed to Jest
const config: Config = {
  coverageProvider: 'babel',
  testEnvironment: 'node',
  collectCoverage: true,
  coverageDirectory: 'coverage/node',
  collectCoverageFrom: [
    'src/app/api/**/*.ts', // Adjust the pattern to match the files you want to include in coverage
    'src/lib/model/**/*.ts', // Adjust the pattern to match the files you want to include in coverage
    // '!src/**/*.d.ts', // Exclude type definition files
    // '!src/**/index.ts' // Exclude index files if needed
  ],
  // Add more setup options before each test is run
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  preset: 'ts-jest',
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': '<rootDir>/node_modules/babel-jest',
  },
  moduleNameMapper: {
    '^.+\\.(css|less|scss)$': 'identity-obj-proxy',
  },
  testMatch: ['<rootDir>/__test__/api/*.test.ts'],
};

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
export default createJestConfig(config);
