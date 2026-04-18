import { Locator, Page } from "@playwright/test";




export class Cart {

    readonly page: Page;
    readonly continueBtn: Locator
    readonly proceedBtn: Locator;

    constructor(page: Page) {
        this.page = page;
        this.continueBtn  = page.getByText('Continue Shopping');
        this.proceedBtn = page.getByText('Proceed to checkout');
        
    }




    async getCurrentStep(): Promise<string> {
        return await this.page.locator('div.step-indicator').innerText();
    } 

}