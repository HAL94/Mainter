import * as yup from 'yup';

import { Translate } from 'src/locale/translation';

export default yup
  .object({
    email: yup.string().email(Translate('emailValidFormat')).required(Translate('emailIsRequired')),
    password: yup.string().required(Translate('passwordIsRequired')).min(6, Translate('passwordMin6Chars')),
  })
  .required();
