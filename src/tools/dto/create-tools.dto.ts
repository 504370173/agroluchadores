import { IsNotEmpty } from "class-validator";

export class CreateToolsDto {
    @IsNotEmpty() name: string;
    @IsNotEmpty() type: string;
    @IsNotEmpty() amount: number;
}