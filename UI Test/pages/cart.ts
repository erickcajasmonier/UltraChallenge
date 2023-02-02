import type { Page } from 'playwright';

import cart from '../selectors/cart';

const el = {
  ...cart,
};

export class CartPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  getProductNameElement() {
    return this.page.locator(el['itemNameText']);
  }

  getProductPriceElement() {
    return this.page.locator(el['itemPriceText']);
  }

  getProductActionBtnElement() {
    return this.page.locator(el['removeButton']);
  }

  async clickCheckoutButton() {
    this.page.click(el['checkoutButton']);
  }
}