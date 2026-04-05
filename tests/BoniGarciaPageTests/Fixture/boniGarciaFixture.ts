import { test } from "@playwright/test";
import MainPage from "../../../src/POM/BoniGarciaTestPage/pages/MainPage";

export const fixture = test.extend<{ mainPage: MainPage }>({
  mainPage: async ({ page }, use) => {
    const mainPage = new MainPage(page);
    await mainPage.openMainPage();
    await use(mainPage);
  },
});

export { test, expect } from "@playwright/test";
