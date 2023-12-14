import { sample } from 'lodash';
import { faker } from '@faker-js/faker';

// ----------------------------------------------------------------------

export const clients = [...Array(24)].map((_, index) => {
  const sampleData = {
    id: faker.string.uuid(),
    fullName: faker.person.fullName(),
    mobile: faker.phone.number(),
    type: sample(['BUSINESS', 'INDIVIDUAL']),
    code: faker.number.int(),
    email: faker.internet.email(),
  };

  sampleData.businessName = sampleData.type === 'BUSINESS' ? faker.company.name() : '-';

  return sampleData;
});
