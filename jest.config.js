// jest.config.js
module.exports = {
  testEnvironment: 'jsdom',
  testMatch: ['**/*.spec.js'],
  transform: {
    '^.+\\.js$': 'babel-jest'
  },
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '^mockChrome$': '<rootDir>/test/mockChrome.js'
  },
  setupFiles: ['<rootDir>/test/jest.setup.js'], // Add this line
  coverageDirectory: 'coverage',
  collectCoverage: true,
  coverageReporters: ['json', 'lcov', 'text', 'clover'],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80
    }
  }
};
