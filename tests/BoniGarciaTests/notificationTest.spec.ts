import { fixture as test } from "./_fixture/boniGarciaFixture";

test.beforeEach(async ({ mainPage }) => {
  await mainPage.openMainPage();
});

test("Notification page", async ({ mainPage, notificationPage }) => {
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
