import { IsNumberString, IsNotEmpty } from 'class-validator';

export class GetIdDto {
  @IsNumberString()
  @IsNotEmpty()
  id: string | number;
}
