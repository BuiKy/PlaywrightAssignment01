import {expect, test} from '@playwright/test'

test.beforeEach(async ({page}) => {
    // Go to https://www.saucedemo.com/inventory.html page
    await page.goto('/inventory.html')

})

test.skip('TC001 - Verify error message appear when login with invalid user', async ({page}) =>{    
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
    // Validate the "Products" is visible
    await expect(page.locator('.header_secondary_container').getByText('Products', {exact: true})).toBeVisible();
    // On the first item click "Add to cart"
    // await page.locator('xpath=').click();
    // await page.getByRole('button', { name: 'Add to cart' }).click();
    // Click on the cart
    // await page.getByTestId('shopping-cart-link').click();
    // validate pre-added item nsme is visible

    // Click checkout, input all required fields
    // validate the corresponding fields display input text
    // Click Continue
    // validate checkout page has item added earlier
    // Click Finish
    // Validate the "Products" is visible
    // validate thank you msg: "Thank you for your order!"  and "Your order has been dispatched, and will arrive just as fast as the pony can get there!"
})



