import { test as base } from '@playwright/test';
import { NavBarComponent } from 'src/POM/ToolShop/components/NavBar';
import { Contact } from 'src/POM/ToolShop/pages/Contact';
import { MainPage } from 'src/POM/ToolShop/pages/MainPage';
import { SignIn } from 'src/POM/ToolShop/pages/SignIn';


type BaseFixtures = {
    mainPage: MainPage;
    signIn: SignIn;
    contactPage: Contact;
    navBar: NavBarComponent;
}

export const test = base.extend<BaseFixtures>({
    mainPage: async ({page}, use) => {
        await use(new MainPage(page));
    },

    signIn: async ({page}, use) => {
        await use(new SignIn(page));
    },

    contactPage: async({page},use) => {
        await use(new Contact(page));
    },

    navBar: async ({page}, use) => {
        await use(new NavBarComponent(page));
    }

});

