import { IsNotEmpty } from 'class-validator';
import { CreateLocationDto } from 'src/locations/dto/create-location.dto';
import { CreateProductDto } from 'src/products/dto/create-product.dto';

export class CreateInventoryDto {
  @IsNotEmpty() readonly status: boolean;

  @IsNotEmpty() readonly product: CreateProductDto;

  @IsNotEmpty() readonly location: CreateLocationDto;

  @IsNotEmpty() readonly stock: number;
}
