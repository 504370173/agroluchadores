import { IsEmail, IsNotEmpty} from 'class-validator';
import { User } from '../user';

//Se utiliza para devolver info del usuario, por ende, se omite password
export class UserDto {  
    @IsNotEmpty()  id: string;
    @IsNotEmpty()  username: string;
    @IsNotEmpty()  @IsEmail()  email: string;
}

//funcion de utilidad de mapeo para mapear User a una instancia de UserDto
export const toUserDto = (data: User): UserDto => {
    const { id, username, email } = data;
    let userDto: UserDto = { id, username, email }; //,
    return userDto;
}