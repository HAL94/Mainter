import { TITLE, STATUS, DESCRIPTION, ORDER_NUMBER } from "src/forms/job/fields";

export default [
  { id: TITLE, label: { en: 'Title', ar: 'العنوان' } },
  { id: DESCRIPTION, label: { en: 'Description', ar: 'الوصف' } },
  { id: ORDER_NUMBER, label: { en: 'Order Number', ar: 'رقم العمل' } },
  { id: 'client.fullName', label: { en: 'Client Name', ar: 'اسم العميل' }, align: 'center' },
  { id: STATUS, label: { en: 'Status', ar: 'الحالة' } },
  { id: 'actions' },
];
