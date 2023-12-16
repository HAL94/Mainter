import { TYPE, EMAIL, MOBILE, FULL_NAME, BUSINESS_NAME } from "src/forms/client/fields";

export default [
  { id: FULL_NAME, label: { en: 'Full Name', ar: 'الأسم' } },
  { id: MOBILE, label: { en: 'Mobile', ar: 'الجوال' } },
  { id: TYPE, label: { en: 'Type', ar: 'نوع العميل' } },
  { id: BUSINESS_NAME, label: { en: 'Business Name', ar: 'اسم الشركة' }, align: 'center' },
  { id: EMAIL, label: { en: 'Email', ar: 'الإيميل' } },
  { id: 'actions' },
];
