import { expect } from "@playwright/test";
import { test } from "../ToolShopTests/Fixture/base.fixture";


test("Verify contact form page elements", async ({
  mainPage,
  contactPage,
}) => {
  await mainPage.goto();
  await mainPage.navBar.contact();
  await contactPage.verifyContactPageElements();
});

test("Contact form test", async ({ mainPage, contactPage }) => {
  await mainPage.goto();
  await mainPage.navBar.contact();
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
