import type { Page } from 'playwright';

import productList from '../selectors/productList';
import common from '../selectors/common';

const el = {
  ...productList,
  ...common,
};

export class ProductListPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async addProductToBag(position: number) {
    await this.page.click(el['addToCartButton'](position));
  }

  async getProductName(position: number) {
    return await this.page.innerText(el['itemNameText'](position));
  }

  async getProductPrice(position: number) {
    return await this.page.innerText(el['itemPriceText'](position));
  }

  async getShoppingCardQty() {
    return await this.page.innerText(el['shoppingCart']);
  }

  async getProductActionBtnText(position: number) {
    return await this.page.innerText(el['addToCartButton'](position));
  }

  async goToShoppingCart() {
    await this.page.click(el['shoppingCart']);
  }
}