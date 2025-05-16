/** @type {import('jest').Config} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest', // Transform TypeScript + JSX
  },
  testMatch: ['**/__tests__/**/*.(test|spec).(ts|tsx)'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '\\.(css|scss|sass|less)$': 'identity-obj-proxy',
  },
  transformIgnorePatterns: ['node_modules/(?!(your-esm-lib)/)'], // optional
};
