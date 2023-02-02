import { expect } from '@playwright/test';
import { ProductListPage } from '../pages/product-list';
import { CartPage } from '../pages/cart';
import { CheckoutPage } from '../pages/checkout';
import { test } from '../helpers/hooks';
import { Actions } from '../helpers/actions';

const firstName = 'FirstName';
const lastName = 'LastName';
const zipCode = 12345;

test('Validate purchase one item successfully', async ({ page }) => {
  const productListPage = new ProductListPage(page);
  const cartPage = new CartPage(page);
  const checkoutPage = new CheckoutPage(page);
  const actions = new Actions();
  const productPosition = 1;

  const productNames = [await productListPage.getProductName(productPosition)];
  const productPrices = [await productListPage.getProductPrice(productPosition)];
  
  await productListPage.addProductToBag(productPosition);
  expect(await productListPage.getProductActionBtnText(productPosition)).toBe('REMOVE');
  expect(await productListPage.getShoppingCardQty()).toBe('1');

  await productListPage.goToShoppingCart();
  await expect(cartPage.getProductNameElement()).toHaveText(
    productNames,
    { useInnerText: true }
  );
  await expect(cartPage.getProductPriceElement()).toHaveText(
    productPrices,
    { useInnerText: true }
  );
  await expect(cartPage.getProductActionBtnElement()).toHaveText(
    ['REMOVE'],
    { useInnerText: true }
  );

  await cartPage.clickCheckoutButton();
  await checkoutPage.fillCustomerInformation(firstName, lastName, zipCode);
  await checkoutPage.verifyOrderOverview(productNames, productPrices);
  await actions.sleep(2000);
  expect(
    await checkoutPage.getOrderConfirmation().screenshot()
  ).toMatchSnapshot([`order-confirmation.png`]);
});

test('Validate purchase two items successfully', async ({ page }) => {
  const productListPage = new ProductListPage(page);
  const cartPage = new CartPage(page);
  const checkoutPage = new CheckoutPage(page);
  const actions = new Actions();
  const firstProductPosition = 1;
  const secondProductPosition = 2;

  const productNames = [await productListPage.getProductName(firstProductPosition),
    await productListPage.getProductName(secondProductPosition),];
  const productPrices = [await productListPage.getProductPrice(firstProductPosition),
    await productListPage.getProductPrice(secondProductPosition),];
  
  await productListPage.addProductToBag(firstProductPosition);
  await productListPage.addProductToBag(secondProductPosition);
  expect(await productListPage.getProductActionBtnText(firstProductPosition)).toBe('REMOVE');
  expect(await productListPage.getProductActionBtnText(secondProductPosition)).toBe('REMOVE');
  expect(await productListPage.getShoppingCardQty()).toBe('2');

  await productListPage.goToShoppingCart();
  await expect(cartPage.getProductNameElement()).toHaveText(
    productNames,
    { useInnerText: true }
  );
  await expect(cartPage.getProductPriceElement()).toHaveText(
    productPrices,
    { useInnerText: true }
  );
  await expect(cartPage.getProductActionBtnElement()).toHaveText(
    ['REMOVE', 'REMOVE'],
    { useInnerText: true }
  );

  await cartPage.clickCheckoutButton();
  await checkoutPage.fillCustomerInformation(firstName, lastName, zipCode);
  await checkoutPage.verifyOrderOverview(productNames, productPrices);
  await actions.sleep(2000);
  expect(
    await checkoutPage.getOrderConfirmation().screenshot()
  ).toMatchSnapshot([`order-confirmation.png`]);
});