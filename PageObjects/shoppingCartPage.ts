import { expect, Locator, Page } from "@playwright/test";

export class ShoppingCartPage{
    readonly page: Page;
    readonly checkOutBtn: Locator;
    readonly productName: Locator;
    constructor(page: Page){
        this.page = page;
        this.productName = page.locator('//div[contains(@class,"inventory_item_name")]');
        this.checkOutBtn = page.locator('#checkout');
    }
    async verifySelectedProduct(productSelected: string){
        await expect(this.productName).toHaveText(productSelected)
    }

    async clickToCheckOut(){
        await this.checkOutBtn.click();
    }

}