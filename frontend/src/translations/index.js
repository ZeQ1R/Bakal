import { en } from './en';
import { mk } from './mk';
import { sq } from './sq';

export const translations = {
  en,
  mk,
  sq,
};

export const useTranslation = (language) => {
  return translations[language] || translations.en;
};
