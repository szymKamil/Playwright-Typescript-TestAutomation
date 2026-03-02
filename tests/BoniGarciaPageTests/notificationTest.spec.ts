import MainPage from "../../src/POM/BoniGarciaTestPage/pages/MainPage";
import { NotificationPage } from "../../src/POM/BoniGarciaTestPage/pages/NotificationPage";
import { fixture as test } from "./boniGarciaFixture.spec";

test.beforeEach(async ({ mainPage }) => {
  await mainPage.openMainPage();
});

test("Notification page", async ({ page }) => {
  const notificationPage = new NotificationPage(page);
  await notificationPage.mockNotifications();
  const mainPage = new MainPage(page);
  await mainPage.openMainPage();
  await mainPage.openPage("Notifications");
  await notificationPage.notifyMe();
  await notificationPage.getNotifications();
  await notificationPage.verifyNotification({"body": "Hey there!", "icon": "https://bonigarcia.dev/selenium-webdriver-java/img/hands-on-icon.png", "title": "This is a notification"});
});
