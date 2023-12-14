import * as yup from 'yup';

import { Translate } from 'src/locale/translation';

import { COST, WORK, WORKS, TITLE, OWNERID, VEHICLEID, DESCRIPTION } from './fields';

export default yup
  .object({
    [OWNERID]: yup
      .number()
      .typeError(Translate('vehicleForm.ownerIdIsRequired'))
      .required(Translate('vehicleForm.ownerIdIsRequired')),
    [VEHICLEID]: yup
      .number()
      .typeError("'VehicleId' is required")
      .required('Vehicle is required'),
    [TITLE]: yup.string().required("'title' field is required"),
    [DESCRIPTION]: yup.string().required("'description' field is required"),
    [WORKS]: yup
      .array(
        yup.object({
          [WORK]: yup.string().required("'work' field is required"),
          [COST]: yup
            .number()
            .typeError("'cost' field is required")
            .required("'cost' field is required"),
        })
      )
      .min(1),
  })
  .required();
