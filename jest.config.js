/** @type {import('ts-jest').JestConfigWithTsJest} **/
export default {
  preset: "ts-jest",
  rootDir: "src",
  testEnvironment: "node",
  transform: {
    "^.+.ts$": ["ts-jest", { useESM: true }],
  },
  testTimeout: 60_000,
  moduleNameMapper: {
    "^(.*/.*)\\.js$": "$1",
  },
};
