import { expect } from '@playwright/test';
import type { Page } from 'playwright';

import checkout from '../selectors/checkout';

const el = {
  ...checkout,
};

export class CheckoutPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async fillCustomerInformation(firstname: string, lastname: string, zipCode: number) {
    await this.page.fill(el['firstNameTextField'], firstname);
    await this.page.fill(el['lastNameTextField'], lastname);
    await this.page.fill(el['postalCodeTextField'], zipCode.toString());
    await this.page.click(el['continueButton']);
  }

  async verifyOrderOverview(productNames, productPrices) {
    let subtotalPrice = 0;
    for(let productPrice of productPrices){
      let price = productPrice.replace('$', '');
      price = Number(price);
      subtotalPrice = subtotalPrice + price;
    }
    const tax = (subtotalPrice * 8 / 100).toFixed(2);
    const totalPrice = Number(subtotalPrice) + Number(tax);

    await expect(this.page.locator(el['itemNameText'])).toHaveText(
      productNames,
      { useInnerText: true }
    );
    await expect(this.page.locator(el['itemPriceText'])).toHaveText(
      productPrices,
      { useInnerText: true }
    );
    expect(await this.page.innerText(el['paymentInfoText'])).toBe('Payment Information:');
    expect(await this.page.innerText(el['shippingInfoText'])).toBe('Shipping Information:');
    expect(await this.page.innerText(el['paymentValueText'])).toContain('SauceCard #');
    expect(await this.page.innerText(el['shippingValueText'])).toBe('FREE PONY EXPRESS DELIVERY!');
    expect(await this.page.innerHTML(el['subtotalText'])).toBe(`Item total: $${subtotalPrice}`);
    expect(await this.page.innerHTML(el['taxText'])).toBe(`Tax: $${tax}`);
    expect(await this.page.innerHTML(el['totalPriceText'])).toBe(`Total: $${totalPrice}`);
    await this.page.click(el['finishButton']);
  }

  getOrderConfirmation() {
    return this.page.locator(el['completeOrderInfo']);
  }
}