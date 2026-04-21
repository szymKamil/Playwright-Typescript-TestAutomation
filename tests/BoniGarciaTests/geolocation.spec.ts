import { fixture as test } from "./_fixture/boniGarciaFixture";

test.use({
  geolocation: { longitude: 99.99, latitude: 66.66 },
  permissions: ["geolocation"],
});

test("Geolocation page test", async ({ mainPage, geolocationPage }) => {
  await mainPage.openMainPage();
  await mainPage.openPage("Geolocation");
  await geolocationPage.getCoordinates();
  await geolocationPage.verifyCoords();
  let coords = await geolocationPage.changeGeolocation({
    longitude: 22.22,
    latitude: 12.34,
  });
  await geolocationPage.getCoordinates();
  await geolocationPage.verifyCoords(coords);
});
