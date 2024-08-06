import { expect, Locator, Page } from "@playwright/test";

export class InventoryPage{
    readonly page: Page;
    readonly titleProduct: Locator;
    readonly addToCartBtn: Locator;
    readonly shoppingCartBtn:Locator;
    constructor(page: Page){
        this.page = page;
        this.titleProduct = page.locator('span.title');
        this.addToCartBtn = page.getByRole('button',{name:'Add to cart'}).nth(1)
        this.shoppingCartBtn = page.locator('.shopping_cart_link');
    }

    async verifyTitleName(titleName: string){
       await expect(this.titleProduct).toHaveText(titleName)
    }

    // async getProductName(){
    //     var product;
    //     var content;
    //     product = await this.productName1st;
    //     content = product.textContent();
    //     return content;
    // }

    async clickAddToCard(){
        await this.addToCartBtn.click()

    }

    async clickToShoppingCart(){
        await this.shoppingCartBtn.click()

    }

    }

