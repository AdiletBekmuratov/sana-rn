import { I18n } from "i18n-js";
import ru from "./translations/ru.json";
import kz from "./translations/kz.json";

const i18n = new I18n();

i18n.translations = {
  ru: ru,
  kz: kz,
};

i18n.enableFallback = true;
i18n.defaultLocale = "ru";
export default i18n;
