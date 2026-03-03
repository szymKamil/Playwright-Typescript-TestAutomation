import { expect, Locator, Page } from "@playwright/test";
import MainPage from "./MainPage";



export class Multilanguage extends MainPage{

    private readonly homeParagraph: Locator;
    private readonly contentParagraph: Locator;
    private readonly aboutParagraph: Locator;
    private readonly contactParagraph: Locator;

    constructor(page: Page){
        super(page);
        this.homeParagraph = page.locator('li[key="_home"]');
        this.contentParagraph = page.locator('li[key="_content"]');
        this.aboutParagraph = page.locator('li[key="_about"]');
        this.contactParagraph = page.locator('li[key="_contact"]');
    }

    public async verifyMultilanguagePage(): Promise<void> {
        await expect(this.homeParagraph).toHaveText('Inicio');
        await expect(this.contentParagraph).toHaveText('Contenido');
        await expect(this.aboutParagraph).toHaveText('Acerca de');
        await expect(this.contactParagraph).toHaveText('Contacto');
        console.log('Page properly display spanish translation.')
    }
}