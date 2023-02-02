import { PlaywrightTestConfig, devices } from '@playwright/test';

const config: PlaywrightTestConfig = {
  use: {
    headless: false,
    baseURL: 'https://www.saucedemo.com/',
    screenshot: 'only-on-failure',
    video: 'on',
    trace: 'on',
  },
  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        viewport: { width: 2700, height: 1200 },
      },
    },
    {
      name: 'firefox',
      use: {
        ...devices['Desktop Firefox'],
        viewport: { width: 2700, height: 1200 },
      },
    },
    {
      name: 'webkit',
      use: {
        ...devices['Desktop Safari'],
        viewport: { width: 2700, height: 1200 },
      },
    },
  ],
  expect: {
    timeout: 10000,
    toMatchSnapshot: {
      threshold: 0.3,
      maxDiffPixelRatio: 0.02,
    },
  },
  timeout: 300000,
  workers: 1,
  retries: 0,
  reportSlowTests: null,
  reporter: [
    ['html', { open: 'always' }],
  ],
};
export default config;
