import { IsEmail, IsNotEmpty } from "class-validator";

export class CreateClientDto {
    @IsNotEmpty() name: string;
    @IsNotEmpty() @IsEmail() email: string;
    @IsNotEmpty() phone: number;
    @IsNotEmpty() status: boolean;
}
