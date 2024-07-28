import {test, expect} from '@playwright/test'
import { before } from 'node:test';

test.beforeEach(async ({page}) => {
    // Go to https://www.saucedemo.com/inventory.html page
    await page.goto('/inventory.html')
    await page.locator('#user-name').fill('standard_user');
    await page.locator('#password').fill('secret_sauce');
    await page.locator('#login-button').click()

})

test('test 1 - sort products', async ({page}) => {
    // Validate the "Products" is visible
    await expect(page.locator('.title')).toHaveText('Products')
    // On the sort option, select "sort by price (low to high) 
    await page.locator('.product_sort_container').click(),
    await page.locator('.product_sort_container').selectOption('Price (low to high)')
    //declare an new array to get the price list
    const listPrice: String[] = await page.locator('.inventory_item_price').allInnerTexts();
    // listPrice.forEach(element => {
    //     console.log(parseFloat(element.substring(1)))
    // });
    for(let i=0;i<listPrice.length - 1;i++){
       if (parseFloat(listPrice[i].substring(1)) < parseFloat(listPrice[i+1].substring(1)))
        console.log('mang giam dan:'+i)
    console.log(listPrice[i])
    }
    console.log('mang tang dan')
    // Validate the sort work correctly
})

test.skip('test 2 - Add to cart', async ({page}) => {
    // Validate the "Products" is visible
    await expect(page.locator('.title')).toHaveText('Products')
    // On the first item click "Add to cart"
    // The button text changed into "Remove"  and there is number '1' on the cart
    // Click on the cart
    // validate pre-added item is visible
    // Click checkout, input all required fields
    // validate the corresponding fields display input text
    // Click Continue
    // validate checkout page has item added earlier
    // Click Finish
    // validate thank you msg: "Thank you for your order!"  and "Your order has been dispatched, and will arrive just as fast as the pony can get there!"

})

function isAscending(array) {
    for (let i = 0; i < array.length - 1; i++) {
      if (array[i] > array[i + 1]) {
        return false;
      }
    }
    return true;
  }


