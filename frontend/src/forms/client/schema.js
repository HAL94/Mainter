import * as yup from 'yup';

import { Translate } from 'src/locale/translation';

export default yup
  .object({
    fullName: yup.string().required(Translate('clientForm.fullNameIsRequired')),
    email: yup.string().email(Translate('emailValidFormat')),
    mobile: yup
      .string()
      .required(Translate('mobileIsRequired'))
      .matches(/^((\+|00)966|0)?5\d{8}$/, { message: Translate('mustBeNumber') }),
    type: yup
      .string()
      .required(Translate('clientForm.typeIsRequired'))
      .oneOf(['INDIVIDUAL', 'BUSINESS'], Translate('clientForm.typeIsOneOrTwo')),
    businessName: yup.string()
      .when('type', {
        is: (val) => val === 'BUSINESS',
        then: (schema) => schema.required(Translate('requiredField')),
      })    
  })
  .required();
