import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import chinese from "./cn/chinese.json";
import english from "./en/english.json";
import german from "./de/german.json";

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: english,
    },
    de: {
      translation: german,
    },
    cn: {
      translation: chinese,
    },
  },
  lng: "en",
  fallbackLng: "en",
});

export default i18n;
