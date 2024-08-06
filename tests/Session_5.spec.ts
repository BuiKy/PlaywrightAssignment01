import {expect, Page, test} from '@playwright/test'
import { LoginPage } from '../PageObjects/loginPage'
import { InventoryPage } from '../PageObjects/inventoryPage'
import { ShoppingCartPage } from '../PageObjects/shoppingCartPage'
import { CheckOutPage } from '../PageObjects/checkOutPage'

test.beforeEach(async ({page}) => {
    
    // Go to https://www.saucedemo.com/inventory.html page    
    await test.step('step 1 - go to inventory page', async () =>{
        await page.goto(process.env.BASE_URL!)
        // page.goto('https://www.saucedemo.com/inventory.html')
    })

})

test('TC001 - Verify error message appear when login with invalid user', async ({page}) =>{    
    const loginPage = new LoginPage(page)    
    await test.step('Input username field with:  locked_out_user. and Input password field with: secret_sauce.', async () => {
        await loginPage.inputUserNameAndPassword('locked_out_user','secret_sauce');
        await loginPage.clickLoginButton()
      })

      await test.step('Verify that the error message is displayed.', async () => {
        const errMess = "Epic sadface: Sorry, this user has been locked out.";
        await loginPage.verifyErrMessage(errMess);
      })  
})

test('TC002 - Verify user can order product successfully', async ({page}) =>{
    const loginPage = new LoginPage(page);    
    await test.step('step 2-3 - login with valid username and password', async()=>{
        // login.inputUserNameAndPassword(process.env.USER_NAME!, process.env.PASSWORD!)
        await loginPage.inputUserNameAndPassword('standard_user','secret_sauce')
        await loginPage.clickLoginButton();
    })

    
    const enventoryPage = new InventoryPage(page)   
    await test.step('Validate the "Products" is visible', async () =>{
        enventoryPage.verifyTitleName('Products')
    })

        await test.step('step 4 - On the first item click Add to cart then go to shopping cart', async () =>{
        await   enventoryPage.clickAddToCard();  
        await enventoryPage.clickToShoppingCart();          
    })

    const shoppingCartPage = new ShoppingCartPage(page)
    await test.step('step 5 - validate pre-added item nsme is visible', async () =>{
        await   shoppingCartPage.verify1stItemSelectedDisplayed()
        await  shoppingCartPage.clickToCheckOut();       
    })    

    const checkOutPage = new CheckOutPage(page);
    await test.step('step 6 - input all required fields and validate the corresponding fields display input text', async () =>{
        const firstName ="Nana"
        const lastName = "pika"
        const postalCode = "123121"
        await  checkOutPage.fillInforCheckOut(firstName, lastName, postalCode);
        await checkOutPage.verifyInforInputted(firstName, lastName, postalCode)           
    })

    await test.step('step 7 - Click Continue and validate checkout page has item added earlier', async () =>{
        await checkOutPage.clickContinuteCheckOut();
        await checkOutPage.verifyItemNameDisplayed()
    })

    await test.step('step 8 - Click Finish and validate thank you msg: "Thank you for your order!"  and "Your order has been dispatched, and will arrive just as fast as the pony can get there!', async () =>{
        await checkOutPage.clickFinishCheckOut()
        const headerContentTxt = "Thank you for your order!"
        const messageSuccess = "Your order has been dispatched, and will arrive just as fast as the pony can get there!"
        await checkOutPage.verifyNotifiCheckOutSuccess(headerContentTxt, messageSuccess)
    })
})



