const { defineConfig } = require('@playwright/test');
require('dotenv').config();

module.exports = defineConfig({
  testDir: './e2e-tests',
  timeout: 30 * 1000,
  expect: {
    timeout: 5000,
  },
  fullyParallel: true,
  forbidOnly: process.env.NODE_ENV !== 'development',
  retries: process.env.NODE_ENV !== 'development' ? 2 : 0,
  workers: process.env.NODE_ENV !== 'development' ? 1 : undefined,
  reporter: 'list',
  use: {
    actionTimeout: 0,
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'Default',
      testIgnore: /.*accessibility.spec.js/,
      retries: 0,
    },
    {
      name: 'Accessibility',
      testMatch: /.*accessibility.spec.js/,
      retries: 2,
    },
  ],
  webServer: {
    command: 'npx serve -p 8080 dist',
    port: 8080,
  },
});
