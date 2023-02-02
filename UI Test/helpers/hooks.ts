import { test } from '@playwright/test';

import { CommonPage } from '../pages/common';
import { LoginPage } from '../pages/login';

test.beforeEach(async ({ page }, testInfo) => {
  const loginPage = new LoginPage(page);
  page.setDefaultTimeout(15000);
  // This is going to grab the default URL placed in the playwright.config.ts file.
  await page.goto('', { waitUntil: 'networkidle' });
  await loginPage.login();
  console.log(`[${testInfo.project.name}] Start test "${testInfo.title}"`);
});

test.afterEach(async ({ page }, testInfo) => {
  const commonPage = new CommonPage(page);
  await commonPage.resetAppState();
  await commonPage.logout();

  if (testInfo.status !== testInfo.expectedStatus) {
    console.log(
      `[${testInfo.project.name}] "${testInfo.title}" did not run as expected`
    );
  }
  console.log(
    `[${testInfo.project.name}] Finish test "${testInfo.title}" with status ${testInfo.status}`
  );
});

export { test };