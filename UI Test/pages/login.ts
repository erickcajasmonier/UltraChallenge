import type { Page } from 'playwright';

import login from '../selectors/login';

const el = {
  ...login,
};
const username = 'standard_user';
const password = 'secret_sauce';

export class LoginPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }
  
  async login() {
    await this.page.fill(el['usernameTextField'], `${username}`);
    await this.page.fill(el['passwordTextField'], `${password}`);
    await this.page.click(el['loginButton']);
  }
}