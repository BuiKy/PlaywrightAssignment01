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
    await expect(page.getByText('Products', {exact: true})).toBeVisible()
    // On the sort option, select "sort by price (low to high) 
    await page.locator('.product_sort_container').click(),
    await page.locator('.product_sort_container').selectOption('Price (low to high)')
    //declare a new array to get the price list
    const listPrice: String[] = await page.locator('.inventory_item_price').allInnerTexts();
    // isSorted(listPrice)
    expect(arraySortedOrNot(listPrice, listPrice.length)).toEqual(true);
    console.log("listPrice.length: "+listPrice.length)
    console.log("arraySortedOrNot(listPrice, listPrice.length) "+arraySortedOrNot(listPrice, listPrice.length))
})

test('test 2 - Add to cart', async ({page}) => {
    // Validate the "Products" is visible
    await expect(page.getByText('Products', {exact: true})).toBeVisible()
    // On the first item click "Add to cart"
    const productName = await page.locator('//div[contains(@class,"inventory_item_name")]').nth(1).textContent();
    await page.getByRole('button', { name: 'Add to cart' }).nth(1).click();
    // The button text changed into "Remove"  and there is number '1' on the cart

    // Click on the cart
    await page.locator('.shopping_cart_container').click();
    // validate pre-added item is visible
    expect(await page.locator('//div[contains(@class,"inventory_item_name")]').textContent()).toEqual(productName)
    // Click checkout, input all required fields
    await page.locator('#checkout').click();
    const firstName = "Na"
    const lastName = "Na"
    const postalCode = "123123"
    await page.locator('#first-name').fill(firstName);
    await page.locator('#last-name').fill(lastName);
    await page.locator('#postal-code').fill(postalCode);    
    // validate the corresponding fields display input text
    expect(await page.locator('#first-name').inputValue()).toEqual(firstName)
    expect(await page.locator('#last-name').inputValue()).toEqual(lastName)
    expect(await page.locator('#postal-code').inputValue()).toEqual(postalCode)
    // Click Continue
    await page.locator('#continue').click()
    // validate checkout page has item added earlier
    expect(await page.locator('//div[contains(@class,"inventory_item_name")]').textContent()).toEqual(productName)
    // Click Finish
    await page.locator('#finish').click()
    // validate thank you msg: "Thank you for your order!"  and "Your order has been dispatched, and will arrive just as fast as the pony can get there!"
    const headerCompletedText = "Thank you for your order!";
    const completeText = "Your order has been dispatched, and will arrive just as fast as the pony can get there!"
    await expect(page.locator('//h2[@data-test="complete-header"]')).toHaveText(headerCompletedText)
    await expect(page.locator('//div[@data-test="complete-text"]')).toHaveText(completeText)
})

    // sorted in non-decreasing order.
    function arraySortedOrNot(arr, n)
    {

        // Array has one or no element
        if (n == 0 || n == 1)
            return true;

        for (let i = 1; i < n; i++)

            // Unsorted pair found
            if (parseFloat(arr[i - 1].substring(1)) > parseFloat(arr[i].substring(1)))
                return false;

        // No unsorted pair found
        return true;
    }