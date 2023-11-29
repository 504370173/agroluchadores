import { IsNotEmpty } from 'class-validator';

export class CreateProductDto {
  readonly id: number;

  @IsNotEmpty() readonly name: string;

  @IsNotEmpty() readonly amount: number;

  @IsNotEmpty() readonly measure: string;

  @IsNotEmpty() readonly season: string;

  @IsNotEmpty() readonly categoryId: number;

  @IsNotEmpty() readonly stock: number;

  @IsNotEmpty() readonly location: number;

  @IsNotEmpty() readonly status: boolean;
}
