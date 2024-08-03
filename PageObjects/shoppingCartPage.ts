import { expect, Locator, Page } from "@playwright/test";

export class ShoppingCartPage{
    readonly page: Page;
    readonly checkOutBtn: Locator;
    readonly productName: Locator;
    constructor(page: Page){
        this.page = page;
        this.productName = page.locator(`(//div[@class='inventory_item_name'])[1]`);
        this.checkOutBtn = page.locator('#checkout');
    }
    async verify1stItemSelectedDisplayed(){
        await expect(this.productName).toBeVisible()
    }

    async clickToCheckOut(){
        await this.checkOutBtn.click();
    }

}