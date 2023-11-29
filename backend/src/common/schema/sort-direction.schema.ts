import { z } from 'zod';

export enum DIRECTIONS {
  ASC = 'asc',
  DESC = 'desc',
}

const SortDirectionSchema = z.union([
  z.literal(DIRECTIONS.ASC),
  z.literal(DIRECTIONS.DESC),
]);

export default SortDirectionSchema;
