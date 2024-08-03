import {expect, Page, test} from '@playwright/test'
import { LoginPage } from '../PageObjects/loginPage'
import { InventoryPage } from '../PageObjects/inventoryPage'
import { ShoppingCartPage } from '../PageObjects/shoppingCartPage'
import { CheckOutPage } from '../PageObjects/checkOutPage'

test.beforeEach(async ({page}) => {
    
    // Go to https://www.saucedemo.com/inventory.html page    
    await test.step('step 1 - go to inventory page', async () =>{
        await page.goto(process.env.BASE_URL!)
    })

})

test.skip('TC001 - Verify error message appear when login with invalid user', async ({page}) =>{    
    const login = new LoginPage(page)    
    await test.step('Input username field with:  locked_out_user. and Input password field with: secret_sauce.', async () => {
        login.inputUserNameAndPassword('locked_out_user','secret_sauce');
        login.clickLoginButton()
      })

      await test.step('Verify that the error message is displayed.', async () => {
        const errMess = "Epic sadface: Sorry, this user has been locked out.";
        await login.verifyErrMessage(errMess);
      })  
})

test('TC002 - Verify user can order product successfully', async ({page}) =>{
    const login = new LoginPage(page);     
    const checkOutPage = new CheckOutPage(page);
    var productName;
    await test.step('step 2-3 - login with valid username and password', async()=>{
        login.inputUserNameAndPassword(process.env.USER_NAME!, process.env.PASSWORD!)
        login.clickLoginButton();
    })

    const enventoryPage = new InventoryPage(page)   
    await test.step('Validate the "Products" is visible', async () =>{
        enventoryPage.verifyTitleName('Products')
    })
    await test.step('step 4 - On the first item click Add to cart', async () =>{
       productName = enventoryPage.getProductName()
       console.log("===="+productName)
    await page.waitForTimeout(5000);
    enventoryPage.clickAddToCard();  
    enventoryPage.clickToShoppingCart();          
    })
    const shoppingCartPage = new ShoppingCartPage(page)
    await test.step('step 5 - validate pre-added item nsme is visible', async () =>{
        shoppingCartPage.verifySelectedProduct(productName)
       
    })    
    // await test.step('step 6 - Click checkout, input all required fields', async () =>{
    //     // await page.locator('#checkout').click();
    //     await page.waitForTimeout(5000);
    //     await shoppingCartPage.clickToCheckOut();
    //     await page.waitForTimeout(3000);
    //     checkOutPage.fillInforCheckOut("Na","dontknow","123123");   
        
    // })

    // await test.step('step 7 - Click Continue and validate checkout page has item added earlier', async () =>{
    //     checkOutPage.clickContinuteCheckOut();
    // })

    // await test.step('step 8 - Click Finish and validate thank you msg: "Thank you for your order!"  and "Your order has been dispatched, and will arrive just as fast as the pony can get there!', async () =>{
    //     checkOutPage.clickFinishCheckOut
    //     await page.waitForTimeout(3000);
    //     const headerContentTxt = "Thank you for your order!"
    //     const messageSuccess = "Your order has been dispatched, and will arrive just as fast as the pony can get there!"
    //     checkOutPage.verifyNotifiCheckOutSuccess(headerContentTxt, messageSuccess)
    // })
/*
    // Validate the "Products" is visible
    await expect(page.getByText('Products', {exact: true})).toBeVisible()
    producPage.isElementVisible()
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
    await expect(page.locator('//div[@data-test="complete-text"]')).toHaveText(completeText)*/
})



