import { IsArray, IsEmail, IsNotEmpty } from "class-validator";

export class CreateSuppliersDto {
    @IsNotEmpty() name: string;
    @IsNotEmpty()  @IsEmail() email: string;
    @IsNotEmpty() phone: number;
    @IsArray()    supplyId: number[]; // Arreglo de IDs de insumos
    @IsArray()    toolId: number[]; // Arreglo de IDs de herramientas
}

// { EJEMPLO
//     "name": "Nombre del Proveedor",
//     "email": "proveedor@email.com",
//     "phone": 1234567890,
//     "supplies": [1, 2, 3], // IDs de insumos
//     "tools": [4, 5, 6] // IDs de herramientas
// }