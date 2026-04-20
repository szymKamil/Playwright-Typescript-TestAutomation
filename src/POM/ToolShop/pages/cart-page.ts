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


    // TODO: 
    // pętla po <tr> i w lokatorze dla 1 wiersza szukam elementu, a jak będzie, to zwracam indeks i weryfikuję po contains, czy zgadza się nazwa w tr/td 

}