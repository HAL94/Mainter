import en from './en';
import ar from './ar';

const languages = {
  en,
  ar,
};

export const Translate = (label) => {
  const lang = localStorage.getItem('lang') || 'en';
  const parts = label.split('.');
  let accessor = languages[lang];
  parts.forEach((key) => {
    accessor = accessor[key];
  });
  return accessor;
};

export const currentLocal = () => localStorage.getItem('lang') || 'en';

export default languages;
