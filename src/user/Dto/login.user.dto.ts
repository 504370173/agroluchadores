import { IsNotEmpty} from 'class-validator';

//Para verificar credenciales del usuario cuando intente iniciar sesion
export class LoginUserDto {  
    @IsNotEmpty()  readonly username: string;
    @IsNotEmpty()  readonly password: string;
}