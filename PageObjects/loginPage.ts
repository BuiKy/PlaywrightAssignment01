import { expect, Locator, Page } from "@playwright/test";

export class LoginPage {
    readonly page: Page;
    readonly userName: Locator;
    readonly password: Locator;
    readonly loginBtn: Locator;
    readonly errorMessage: Locator;
    constructor(page: Page){
        this.page = page;
        this.userName = page.locator('#user-name');
        this.password = page.locator('#password');
        this.loginBtn = page.locator('#login-button')
        this.errorMessage = page.locator('[data-test="error"]');
    }

    //input username and password
    async inputUserNameAndPassword(userName: string, password: string){
        await this.userName.fill(userName);
        await this.password.fill(password);
    }

    //click on login button
    async clickLoginButton(){
        await this.loginBtn.click()
    }

    //verify element to have text
    async verifyErrMessage(errMessage: string){
        await expect(this.errorMessage).toHaveText(errMessage)
    }
}