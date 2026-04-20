import { NotificationPage } from "../../src/POM/BoniGarciaTestPage/pages/NotificationPage";
import { fixture as test } from "./Fixture/boniGarciaFixture";

test.beforeEach(async ({ mainPage }) => {
  await mainPage.openMainPage();
});

test("Notification page", async ({ mainPage, page }) => {
  const notificationPage = new NotificationPage(page);
  await notificationPage.mockNotifications();
  await mainPage.openMainPage();
  await mainPage.openPage("Notifications");
  await notificationPage.notifyMe();
  await notificationPage.getNotifications();
  await notificationPage.verifyNotification({
    body: "Hey there!",
    icon: "https://bonigarcia.dev/selenium-webdriver-java/img/hands-on-icon.png",
    title: "This is a notification",
  });
});
