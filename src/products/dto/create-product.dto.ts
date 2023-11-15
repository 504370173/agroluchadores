import { IsNotEmpty, IsNumber } from "class-validator";

export class CreateProductDto {
    @IsNotEmpty() name: string; 

    @IsNotEmpty() amount: number; //isNumber()

    @IsNotEmpty() measure: string; 

    @IsNotEmpty() season: string; 

    @IsNotEmpty() categoryId: number; 

    // @IsNotEmpty() seasonId: number; 
}
