import { IsNumberString, IsNotEmpty } from 'class-validator';

export class GetClientDto {
  @IsNumberString()
  @IsNotEmpty()
  id: string | number;
}
