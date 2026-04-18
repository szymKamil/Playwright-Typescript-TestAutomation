import { expect } from "@playwright/test";
import { test } from "@fixtures/ui.fixture";

test("Verify contact form page elements", async ({ main, contact }) => {
  await main.goto();
  await main.navBar.contact();
  await contact.verifyContactPageElements();
});

test("Contact form test", async ({ main, contact }) => {
  await main.goto();
  await main.navBar.contact();
  const testFile = await contact.actions.createTestFile("testFile.txt");
  await contact.fillContactForm(
    "John",
    "Doe",
    "john.doe@example.com",
    "Status of my order",
    "Hello, I have a question about your products. Now i will insert some random words to make this message longer. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    testFile,
  );
  await contact.submitForm();
  await expect(contact.contactSucessMessage).toBeVisible();
  await contact.actions.deleteTestFile(testFile);
});

test.describe("Error form usage test", () => {
  test("Contact form errors in name fiels", {tag: ['@ui', '@errror', '@smoke']}, async ({ main, contact }) => {
    await main.goto();
    await main.navBar.contact();
    const testFile = await contact.actions.createTestFile("testFile.txt");
    await contact.fillContactForm(
      "",
      "",
      "john.doe@example.com",
      "Status of my order",
      "Hello, I have a question about your products. Now i will insert some random words to make this message longer. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      testFile,
    );
    await contact.submitForm();
    await contact.expectErrors(["firstName", "lastName"]);
  });


  test("Contact form test error in all fields", {tag: ['@ui', '@errror', '@smoke']}, async ({ main, contact }) => {
    await main.goto();
    await main.navBar.contact();
    const testFile = await contact.actions.createTestFile("testFile.txt");
    await contact.fillContactForm(
      "",
      "",
      "",
      "",
      "",
      testFile,
    );
    await contact.submitForm();
    await contact.expectErrors(["firstName", "lastName", "email", "message", "subject"]);
  });
});
