import en from './en';
import ar from './ar';

const languages = {
  en,
  ar
};
  
export const Translate = (label) => {
  const lang = localStorage.getItem('lang') || 'en';
  return languages[lang][label];
}

export default languages;
