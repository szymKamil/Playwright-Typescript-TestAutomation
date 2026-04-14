import { expect } from "@playwright/test";
import { test } from "../ToolShopTests/Fixture/base.fixture"
import { Contact } from "../../src/POM/ToolShop/pages/Contact";
import * as constans from "../../src/POM/ToolShop/utils/constans";
import { MainPage } from "../../src/POM/ToolShop/pages/MainPage";


test('Verify contact form page elements', async ({ page, mainPage }) => {
  await mainPage.goto();
  await mainPage.navBar.contact();
  const contactPage = new Contact(page);
  await contactPage.verifyContactPageElements();
});



test("Contact form test", async ({ page, mainPage }) => {
  await page.goto(constans.url);
  await mainPage.navBar.contact();
  const contactPage = new Contact(page);
  const testFile = await contactPage.actions.createTestFile("testFile.txt");
  await contactPage.fillContactForm(
    "John",
    "Doe",
    "john.doe@example.com",
    "Status of my order",
    "Hello, I have a question about your products. Now i will insert some random words to make this message longer. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    testFile,
  );
  await contactPage.submitForm();
  await expect(contactPage.contactSucessMessage).toBeVisible();
  await contactPage.actions.deleteTestFile(testFile);
});
