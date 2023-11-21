import languages from './languages';
import allTranslations from './translation';

const getLabel = (lang, key) => {
  try {
    const translation = allTranslations[lang];

    return translation[key];

  } catch (error) {    
    return 'No translate';
  }
};

export const isRTL = () => {
  const lang = localStorage.getItem('lang') || 'en';

  return languages[lang].isRtl;
}

const useLanguage = () => {
  const lang = localStorage.getItem('lang') || 'en';

  const translate = (value) => getLabel(lang, value);

  return translate;
};

export default useLanguage;
