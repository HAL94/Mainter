import { IsNotEmpty, IsNumberString } from 'class-validator';

export class PageDto {
  @IsNotEmpty()
  @IsNumberString()
  skip: number;

  @IsNotEmpty()
  @IsNumberString()
  limit: string;
}
