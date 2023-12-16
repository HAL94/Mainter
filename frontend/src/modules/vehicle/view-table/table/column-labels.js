import { MAKE, YEAR, MODEL, PLATE, ENGINENO } from "src/forms/vehicle/fields";

export default [
  { id: MAKE, label: { en: 'Make', ar: 'شركة الصنع' } },
  { id: MODEL, label: { en: 'Model', ar: 'الموديل' } },
  { id: PLATE, label: { en: 'Plate', ar: 'رقم اللوحة' } },
  { id: YEAR, label: { en: 'Year', ar: 'سنة الصنع' }, align: 'center' },
  { id: ENGINENO, label: { en: 'Engine No', ar: 'رقم المكينة' }, align: 'center' },
  { id: 'client.fullName', label: { en: 'Owner', ar: 'مالك المركبة' } },
  { id: 'actions' },
];
