import {expect, test} from '@playwright/test'
import exp from 'node:constants';

test.beforeEach(async ({page}) => {
    // Go to https://www.saucedemo.com/inventory.html page
    await page.goto('/inventory.html')

})

test('TC001 - Verify error message appear when login with invalid user', async ({page}) =>{    
    // Input username field with:  locked_out_user.
    await page.locator('#user-name').fill('locked_out_user');
    // Input password field with: secret_sauce.
    await page.locator('#password').fill('secret_sauce');
    // Click login.
    await page.locator('#login-button').click();
    // Verify that the error message “Epic sadface: Sorry, this user has been locked out.” is displayed.
    const errMess = "Epic sadface: Sorry, this user has been locked out.";
    await expect(page.getByRole('heading', {name: errMess})).toBeVisible();
})

test('TC002 - Verify user can order product successfully', async ({page}) =>{
    // Input username field with: standard_user.
    await page.locator('#user-name').fill('standard_user');
    // Input password field with: secret_sauce.
    await page.locator('#password').fill('secret_sauce');
    // Click login.
    await page.locator('#login-button').click();
    // Validate the "Products" is visible
    await expect(page.getByText('Products', {exact: true})).toBeVisible()
    // On the first item click "Add to cart"
    const productName = await page.locator('//div[contains(@class,"inventory_item_name")]').nth(1).textContent();
    console.log("you selected a product: "+productName);
    await page.getByRole('button', { name: 'Add to cart' }).nth(1).click();
    // Click on the cart
    await page.locator('.shopping_cart_container').click();
    // validate pre-added item nsme is visible
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



