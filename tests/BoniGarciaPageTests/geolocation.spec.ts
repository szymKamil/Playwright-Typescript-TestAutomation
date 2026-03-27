import { fixture as test } from "./Fixture/boniGarciaFixture";
import { GeolocationPage } from "../../src/POM/BoniGarciaTestPage/pages/GeolocationPage";

test.use({
  geolocation: { longitude: 99.99, latitude: 66.66 },
  permissions: ["geolocation"],
});

test.beforeEach(async ({ mainPage }) => {
  await mainPage.openMainPage();
});

test("Geolocation page test", async ({ mainPage, page }) => {
  await mainPage.openMainPage();
  await mainPage.openPage("Geolocation");
  const geolocationPage = new GeolocationPage(page);
  await geolocationPage.getCoordinates();
  await geolocationPage.verifyCoords();
  let coords = await geolocationPage.changeGeolocation({
    longitude: 22.22,
    latitude: 12.34,
  });
  await geolocationPage.getCoordinates();
  await geolocationPage.verifyCoords(coords);
});
