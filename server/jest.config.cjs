module.exports = {
  testEnvironment: "node",
  extensionsToTreatAsEsm: [".test.js"],
  moduleFileExtensions: ["js", "json", "node"],
  testMatch: ["**/tests/**/*.test.js"],
  verbose: true,
  forceExit: true,
  transform: {},
  globalTeardown: "./tests/globalTeardown.cjs",
};
