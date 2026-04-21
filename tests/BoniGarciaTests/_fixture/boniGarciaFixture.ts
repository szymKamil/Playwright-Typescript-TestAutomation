import { test } from "@playwright/test";
import MainPage from "../../../src/POM/BoniGarciaTestPage/pages/MainPage";
import { RandomCalculatorPage } from "src/POM/BoniGarciaTestPage/pages/RandomCalculatorPage";
import { ConsoleLogsPage } from "src/POM/BoniGarciaTestPage/pages/ConsoleLogsPage";
import { CookiesPage } from "src/POM/BoniGarciaTestPage/pages/CookiesPage";
import { DialgBoxesPage } from "src/POM/BoniGarciaTestPage/pages/DialogBoxesPage";
import { DownloadFilePage } from "src/POM/BoniGarciaTestPage/pages/DownloadFilePage";
import { DragAndDrop } from "src/POM/BoniGarciaTestPage/pages/DragAndDrop";
import { DrawInCanvas } from "src/POM/BoniGarciaTestPage/pages/DrawInCanvas";
import { DropdownMenuPage } from "src/POM/BoniGarciaTestPage/pages/DropdownMenuPage";
import { FramesPage } from "src/POM/BoniGarciaTestPage/pages/FramesPage";
import { GeolocationPage } from "src/POM/BoniGarciaTestPage/pages/GeolocationPage";
import { IFramePage } from "src/POM/BoniGarciaTestPage/pages/iFramePage";
import { InfiniteScrollPage } from "src/POM/BoniGarciaTestPage/pages/InfiniteScrollPage";
import { LoadingImagesPage } from "src/POM/BoniGarciaTestPage/pages/LoadingImagesPage";
import { LoginFormPage } from "src/POM/BoniGarciaTestPage/pages/LoginFormPage";
import { LongPage } from "src/POM/BoniGarciaTestPage/pages/LongPage";
import { UserMediaPage } from "src/POM/BoniGarciaTestPage/pages/UserMediaPage";
import { MouseOverPage } from "src/POM/BoniGarciaTestPage/pages/MouseOverPage";
import { Multilanguage } from "src/POM/BoniGarciaTestPage/pages/Multilanguage";
import NavigationPage from "src/POM/BoniGarciaTestPage/pages/NavigationPage";
import { ShadowDOM } from "src/POM/BoniGarciaTestPage/pages/ShadowDOM";
import { SlowCalculator } from "src/POM/BoniGarciaTestPage/pages/SlowCalculator";
import WebForm from "src/POM/BoniGarciaTestPage/pages/WebFormPage";
import { WebStoragePage } from "src/POM/BoniGarciaTestPage/pages/WebStoragePage";
import { NotificationPage } from "src/POM/BoniGarciaTestPage/pages/NotificationPage";

type BoniGarciaPages = {
  mainPage: MainPage;
  consoleLogPage: ConsoleLogsPage;
  randomCalcPage: RandomCalculatorPage;
  cookiesPage: CookiesPage;
  dialogBoxesPage: DialgBoxesPage;
  downloadFiles: DownloadFilePage;
  dragAndDropPage: DragAndDrop;
  drawInCanvasPage: DrawInCanvas;
  dropdownPage: DropdownMenuPage;
  framesPage: FramesPage;
  geolocationPage: GeolocationPage;
  iFramePage: IFramePage;
  infiniteScroll: InfiniteScrollPage;
  loadingImagesPage: LoadingImagesPage;
  loginPage: LoginFormPage;
  longPage: LongPage;
  notificationPage: NotificationPage;
  userMediaPage: UserMediaPage;
  mouseOverPage: MouseOverPage;
  multiLang: Multilanguage;
  navigationPage: NavigationPage;
  shadowDomPage: ShadowDOM;
  slowCalculator: SlowCalculator;
  webForm: WebForm;
  webStorage: WebStoragePage;
};

export const fixture = test.extend<BoniGarciaPages>({
  mainPage: async ({ page }, use) => {
    await use(new MainPage(page));
  },
  randomCalcPage: async ({ page }, use) => {
    await use(new RandomCalculatorPage(page));
  },
  consoleLogPage: async ({ page }, use) => {
    await use(new ConsoleLogsPage(page));
  },
  cookiesPage: async ({ page }, use) => {
    await use(new CookiesPage(page));
  },
  dialogBoxesPage: async ({ page }, use) => {
    await use(new DialgBoxesPage(page));
  },
  downloadFiles: async ({ page }, use) => {
    await use(new DownloadFilePage(page));
  },
  dragAndDropPage: async ({ page }, use) => {
    await use(new DragAndDrop(page));
  },
  drawInCanvasPage: async ({ page }, use) => {
    await use(new DrawInCanvas(page));
  },
  dropdownPage: async ({ page }, use) => {
    await use(new DropdownMenuPage(page));
  },
  framesPage: async ({ page }, use) => {
    await use(new FramesPage(page));
  },
  geolocationPage: async ({ page }, use) => {
    await use(new GeolocationPage(page));
  },
  iFramePage: async ({ page }, use) => {
    await use(new IFramePage(page));
  },
  infiniteScroll: async ({ page }, use) => {
    await use(new InfiniteScrollPage(page));
  },
  loadingImagesPage: async ({ page }, use) => {
    await use(new LoadingImagesPage(page));
  },
  loginPage: async ({ page }, use) => {
    await use(new LoginFormPage(page));
  },
  longPage: async ({ page }, use) => {
    await use(new LongPage(page));
  },
  userMediaPage: async ({ page }, use) => {
    await use(new UserMediaPage(page));
  },
  mouseOverPage: async ({ page }, use) => {
    await use(new MouseOverPage(page));
  },
  multiLang: async ({ page }, use) => {
    await use(new Multilanguage(page));
  },
  navigationPage: async ({ page }, use) => {
    await use(new NavigationPage(page));
  },
  shadowDomPage: async ({ page }, use) => {
    await use(new ShadowDOM(page));
  },
  slowCalculator: async ({ page }, use) => {
    await use(new SlowCalculator(page));
  },
  webForm: async ({ page }, use) => {
    await use(new WebForm(page));
  },
  webStorage: async ({ page }, use) => {
    await use(new WebStoragePage(page));
  },
  notificationPage: async ({ page }, use) => {
    await use(new NotificationPage(page));
  },
});

export { expect } from "@playwright/test";
