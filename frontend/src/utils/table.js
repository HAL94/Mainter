import { isRTL } from 'src/locale/useLanguage';

export const getLocalizedDisplayedRowsLabel = ({ from, to, count }) => {
  const ofText = isRTL() ? 'من' : 'of';
  const moreThan = isRTL() ? 'أكثر من' : 'more than';

  return `${from}–${to} ${ofText} ${count !== -1 ? count : `${moreThan} ${to}`}`;
};

export const getLocalizedLabelsRowsPerPage = () => (isRTL() ? 'عدد المعروض' : 'Rows Per Per Page');
