import { IsNotEmpty } from "class-validator";

export class CreateSuppliesDto {
    @IsNotEmpty() name: string;
    @IsNotEmpty() type: string;
    @IsNotEmpty() amount: number;
    @IsNotEmpty() measure: string;
}