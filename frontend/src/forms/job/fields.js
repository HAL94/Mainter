export const TITLE = 'title';
export const DESCRIPTION = 'description';
export const OWNERID = 'ownerId';
export const VEHICLEID = 'vehicleId';
export const WORKS = 'works';
export const STATUS = 'status';

export const COST = 'cost';
export const WORK = 'work';

export const defaultValues = {
  [TITLE]: '',
  [DESCRIPTION]: '',
  [OWNERID]: '',
  [VEHICLEID]: '',
  [WORKS]: [{ work: '', cost: 0 }],
};

export default {
  [TITLE]: TITLE,
  [DESCRIPTION]: DESCRIPTION,
  [OWNERID]: OWNERID,
  [VEHICLEID]: VEHICLEID,
  [WORKS]: WORKS,
  [STATUS]: STATUS,
};
