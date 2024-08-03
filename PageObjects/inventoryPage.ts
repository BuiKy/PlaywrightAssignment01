import { expect, Locator, Page } from "@playwright/test";

export class InventoryPage{
    readonly page: Page;
    readonly titleProduct: string;
    readonly productName1st: Locator;
    readonly addToCartBtn: Locator;
    readonly shoppingCartBtn:Locator;
    constructor(page: Page){
        this.page = page;
        this.titleProduct = '//span[@data-test="title"]';
        this.productName1st = page.locator(`//div[@class="inventory_item"][1]//div[contains(@class,'inventory_item_name')]`);
        this.addToCartBtn = page.locator(`//div[@class="inventory_item"][1]//button`);
        this.shoppingCartBtn = page.locator('.shopping_cart_link');
    }

    async verifyTitleName(titleName: string){
       await expect(this.page.locator(this.titleProduct)).toHaveText(titleName)
    }

    async getProductName(){
        var product;
        var content;
        product = await this.productName1st;
        content = product.textContent();
        return content;
    }

    async clickAddToCard(){
        await this.addToCartBtn.click()

    }

    async clickToShoppingCart(){
        await this.shoppingCartBtn.click()

    }

    }

