module.exports = {
  collectCoverageFrom: [
    '<rootDir>/src/**/*.ts',
    '**/tests/**',
    '<rootDir>/src/**/*.spec.ts',
    '<rootDir>/src/**/*.test.ts',
    '!<rootDir>/src/**/*index.ts',
    '!<rootDir>/src/**/*app.module.ts',
    '!<rootDir>/src/**/*main.ts',
    '!<rootDir>/src/**/*Result.ts',
  ],
  coverageDirectory: 'coverage',
  coveragePathIgnorePatterns: ['\\\\node_modules\\\\'],
  coverageProvider: 'v8',
  roots: ['<rootDir>/src'],
  testEnvironment: 'node',
  testPathIgnorePatterns: ['\\\\node_modules\\\\'],
  transform: {
    '^.+\\.ts$': 'ts-jest',
  },
  testRegex: '.*\\.spec\\.ts$',
  moduleFileExtensions: ['js', 'json', 'ts'],
};
