import { PartialType } from '@nestjs/mapped-types';
import { CreateProductDto } from './create-product.dto';
import { IsNotEmpty } from 'class-validator';

export class UpdateProductDto {
    @IsNotEmpty() name: string; 

    @IsNotEmpty() amount: number; 

    @IsNotEmpty() measure: string; 

    @IsNotEmpty() season: string; 
}
