const base = require("./jest.config");

module.exports = {
  ...base,
  testMatch: ["**/*.integrationTest.ts"],
  testTimeout: 60000,
  setupFiles: ["./setupIntegrationTests.js"],
};
