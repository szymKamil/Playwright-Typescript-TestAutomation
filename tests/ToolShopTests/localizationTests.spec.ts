import { test } from "@fixtures/ui.fixture";

export const translations = {
  en: {
    home: "Home",
    categories: "Categories",
    contact: "Contact",
    signIn: "Sign in",
  },
  de: {
    nav: {
      home: "Start",
      categories: [
        "Kategorien",
        "Hand",
        "Werkzeuge",
        "Elektrische Werkzeuge",
        "Andere",
        "Spezial Werkzeuge",
        "Mietgeräte",
      ],
      contact: "Kontakt",
      signIn: "Einloggen",
      localization: "DE",
    },
    search: {
      sorting: "Sortieren",
      priceRange: "Preisspanne",
      filters: "Suche",
      byCategory: "Nach Kategorie",
      byBrand: "Nach Marken",
      sustainability: "Nachhaltigkeit",
    },
    contact: {
      firstName: "Vorname",
      lastName: "Nachname",
      email: "Email Adresse",
      subject: "Betreff",
      message: "Nachricht",
      attachment: "Anhang",
      send: "Senden",
    },
  },
  fr: {
    nav: {
      home: "Accueil",
      categories: "Catégories",
      contact: "Contact",
      signIn: "Se connecter",
      localization: "FR",
    },
    search: {
      sorting: "Trier",
      priceRange: "Fourchette de prix",
      filters: "Rechercher",
      byCategory: "Par catégorie",
      byBrand: "Par marque",
      sustainability: "Durabilité",
    },
    contact: {
      firstName: "Prénom",
      lastName: "Nom de famille",
      email: "Adresse email",
      subject: "Sujet",
      message: "Message",
      attachment: "Pièce jointe",
      send: "Envoyer",
    },
  },
} as const;

test.describe("German translation test", async () => {
  test.use({ locale: "de-DE" });
  test("DE local", async ({ main, contact }) => {
    await main.goto();
    await main.navBar.verifyNavTranslation(translations.de.nav);
    await main.search.verifySearchTranslation(translations.de.search);
    await main.actions.pageVisualTest("main-DE");
    await main.navBar.contact();
    await contact.verifyTranslation(translations.de.contact);
    await contact.actions.pageVisualTest("main-FR");
  });
});

test.describe("French translation test", async () => {
  test.use({ locale: "fr-FR" });
  test("FR local", async ({ main, contact }) => {
    await main.goto();
    await main.navBar.verifyNavTranslation(translations.fr.nav);
    await main.search.verifySearchTranslation(translations.fr.search);
    await main.actions.pageVisualTest("main-FR");
    await main.navBar.contact();
    await contact.verifyTranslation(translations.fr.contact);
    await contact.actions.pageVisualTest("main-FR");
  });
});
