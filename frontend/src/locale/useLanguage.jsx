import languages from './languages';
import allTranslations from './translation';

const getLabel = (lang, key) => {
  try {
    const translation = allTranslations[lang];
    const parts = key.split('.');

    let word = null;
    let access = {};

    Object.assign(access, translation);

    parts.forEach((token) => {
      access = access[token];
    });

    word = access;

    return word || translation[key];
  } catch (error) {
    return 'No translate';
  }
};

export const isRTL = () => {
  const lang = localStorage.getItem('lang') || 'en';

  return languages[lang].isRtl;
};

const useLanguage = () => {
  const lang = localStorage.getItem('lang') || 'en';

  const translate = (value) => getLabel(lang, value);

  return translate;
};

export default useLanguage;
