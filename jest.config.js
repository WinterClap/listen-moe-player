const nextJest = require("next/jest");

const createJestConfig = nextJest({ dir: "./" });

// Sync object
/** @type {import('@jest/types').Config.InitialOptions} */
const config = {
  setupFilesAfterEnv: ["<rootDir>/jest-setup.js"],
  testEnvironment: "jest-environment-jsdom",
  clearMocks: true,
};

module.exports = createJestConfig(config);
