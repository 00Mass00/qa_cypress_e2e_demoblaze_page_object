/* eslint-disable max-len */
/// <reference types='cypress' />

import CartPage from '../support/pages/cart.pageObject';
import HomeAndCataloguePageObject from '../support/pages/homeСatalogue.pageObject';
import ContactFormPageObject from '../support/pages/contactForm.pageObject';

const homeAndCatalogue = new HomeAndCataloguePageObject();
const cartPage = new CartPage();
const contactForm = new ContactFormPageObject();

describe('Purchase Flow', () => {
  before(() => {
    homeAndCatalogue.visit();
  });

  it('should complete the purchase flow', () => {
    homeAndCatalogue.clickOnCategory('Laptops');
    homeAndCatalogue.clickOnProduct('Sony vaio i7');
    homeAndCatalogue.addToCart();
    homeAndCatalogue.clickOnCart();

    cartPage.assertProductInCart('Sony vaio i7');
    cartPage.placeOrder();

    contactForm.fillOrderForm(
      'John Doe',
      'USA',
      'New York',
      '1234 5678 9012 3456',
      '12', '2023'
    );
    contactForm.clickPurchaseButton();

    contactForm.assertEnteredData(
      'Thank you for your purchase!',
      'John Doe'
    );
  });
});
