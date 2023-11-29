import { IsNotEmpty } from 'class-validator';

export class CreateLocationDto {
  @IsNotEmpty() readonly name: string;

  @IsNotEmpty() readonly description: string;
}
