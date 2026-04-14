import { Locator, Page, expect } from "@playwright/test";
import { verify } from "node:crypto";



export class MyAccountPage {

    readonly myAccountHeader: Locator;

    constructor(public page: any) {
        this.myAccountHeader = page.getByText("My Account");
    }

    async verifyMyAccountPageVisible() {
        await expect(this.myAccountHeader).toBeVisible();
    }
}
