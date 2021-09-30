/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  collectCoverage: true,
  passWithNoTests: true,
  collectCoverageFrom: [
    "src/**/*.{js,ts}",
    "!**/__test__/**",
  ],
};