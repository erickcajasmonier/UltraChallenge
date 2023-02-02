import type { Page } from 'playwright';

import common from '../selectors/common';

const el = {
  ...common,
};

export class CommonPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async resetAppState() {
    await this.page.click(el['menuButton']);
    await this.page.click(el['resetAppButton']);
  }

  async logout() {
    if(!await this.page.locator(el['logoutButton']).isVisible()){
      await this.page.click(el['menuButton']);
    }
    await this.page.click(el['logoutButton']);
  }
}