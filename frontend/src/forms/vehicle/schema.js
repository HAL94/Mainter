import * as yup from 'yup';

import { Translate } from 'src/locale/translation';

import { YEAR, MAKE, MODEL, PLATE, OWNERID, ENGINENO  } from './fields';

export default yup
  .object({
    [OWNERID]: yup
      .number()
      .typeError(Translate('vehicleForm.ownerIdMustBeNumber'))
      .required(Translate('vehicleForm.ownerIdIsRequired')),
    [MAKE]: yup.string().required(Translate('vehicleForm.makeIsRequired')),
    [MODEL]: yup.string().required(Translate('vehicleForm.modelIsRequired')),
    [YEAR]: yup
      .string()
      .required(Translate('vehicleForm.yearIsRequired'))
      .matches(/^\d{4}$/, { message: Translate('vehicleForm.yearMustBe4digits') }),
    [PLATE]: yup
      .string()
      .required(Translate('vehicleForm.plateIsRequired'))
      .matches(/^[A-Za-z]{3}-\d{4}$/, { message: Translate('vehicleForm.plateMustBeSaudi') }),
    [ENGINENO]: yup.string().optional(),
  })
  .required();
