import { fixture as test } from "./_fixture/boniGarciaFixture";



  //Config only for this test
test.use({permissions: ["camera", "microphone"],
  launchOptions: {
      args: [
        '--use-fake-ui-for-media-stream',   // auto-accept
        '--use-fake-device-for-media-stream' // fake kamera/mikrofon
      ],
    }}
);

  test("Media playwer test", async ({ mainPage, userMediaPage }) => {
    await mainPage.openMainPage();
    await mainPage.openPage("Get user media");
    await userMediaPage.runMediaTest();
    await userMediaPage.assertDeviceInfo("Using video device: fake_device_0");
  });

