import { expect, Locator, Page } from "@playwright/test";

export class CheckOutPage{
    readonly page : Page;
    readonly lastNameTxt: Locator;
    readonly fistNameTxt: Locator;
    readonly postalCode: Locator;
    readonly continueBtn: Locator;
    readonly finishBtn: Locator;
    readonly itemName: Locator;
    readonly notiHeaderTxt: Locator;
    readonly notiText: Locator
    constructor(page:Page){
        this.page = page;
        this.fistNameTxt = page.locator('#first-name');
        this.lastNameTxt = page.locator('#last-name');
        this.postalCode = page.locator('#postal-code');
        this.continueBtn = page.locator('#continue');
        this.finishBtn = page.locator('#finish');
        this.notiHeaderTxt = page.locator('//h2[@data-test="complete-header"]');
        this.notiText = page.locator('//div[@data-test="complete-text"]');
        this.itemName = page.locator('//div[contains(@class,"item_name")]');
    }
    async fillInforCheckOut(firstName:string,lastName:string,postalCode:string){
        await this.fistNameTxt.fill(firstName);
        await this.lastNameTxt.fill(lastName);
        await this.postalCode.fill(postalCode)
    }

    async verifyInforInputted(firstName:string,lastName:string,postalCode:string){
        await expect(this.fistNameTxt).toHaveValue(firstName);
        await expect(this.lastNameTxt).toHaveValue(lastName);
        await expect(this.postalCode).toHaveValue(postalCode);
    }

    async clickContinuteCheckOut(){
        await this.continueBtn.click()

    }
    async clickFinishCheckOut(){
        await this.finishBtn.click()
    }

    async verifyItemNameDisplayed(){
        await expect(this.itemName).toBeVisible()

    }
    async verifyNotifiCheckOutSuccess(headerContentTxt: string, messageSuccess: string){
        await expect(this.notiHeaderTxt).toHaveText(headerContentTxt)
        await expect(this.notiText).toHaveText(messageSuccess)

    }
}