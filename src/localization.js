import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "locales/english/index.json";
import ru from "locales/russian/index.json";
import zh from "locales/chinese/index.json";

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources: {
      en: {
        translation: en,
      },
      ru: {
        translation: ru,
      },
      zh: {
        translation: zh,
      },
    },
    lng: "en",
    fallbackLng: "en",

    interpolation: {
      escapeValue: false,
    },
  });
