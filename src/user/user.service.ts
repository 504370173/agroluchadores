import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from 'src/user/Dto/create.user.dto';
import { LoginUserDto } from 'src/user/Dto/login.user.dto';
import { UserDto, toUserDto } from 'src/user/Dto/user.dto';
import { User } from 'src/user/user';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>
    ) { }

    //acepta objeto que acepta cualquier estructura de objeto de filtro TypeORM válida
    //utiliza el repositorio para encontrar un registro de usuario único en BD
    // y devuelve el usuario en forma de UserDto
    async findOne(options?: object): Promise<UserDto> {
        const user = await this.userRepository.findOne(options);
        return toUserDto(user);
    }

    async findByLogin({ username, password }: LoginUserDto): Promise<UserDto> {
        const user = await this.userRepository.findOne({ where: { username } });

        if (!user) {
            throw new HttpException('User not found', HttpStatus.UNAUTHORIZED);
        }

        //compara contraseñas
        //si no se encuentran el usuario o las contraseñas no coinciden, la función arroja un archivo Unauthorized HttpException
        const areEqual = await bcrypt.compare(password, user.password);

        if (!areEqual) {
            throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
        }

        return toUserDto(user);
    }

    //Una vez que Passport.js valida el JWT solicitud actual, y si el token es válido, llama una función de devolución de llamada
    //la cual se verifica el usuario en la BD (aunque puede que el usuario esté bloqueado también).
    // Luego, la función de devolución de llamada pasa el objeto de usuario al middleware Passport.js para que pueda agregarlo al objeto Request actual.
    async findByPayload({ username }: any): Promise<UserDto> {
        return await this.findOne({
            where: { username }
        });
    }

    //Registrar nuevo usuario y garantiza que sea nuevo
    async create(UserDto: CreateUserDto): Promise<UserDto> {
        const { username, password, email } = UserDto;

        //verifica si existe en BD
        const userInDb = await this.userRepository.findOne({
            where: { username }
        });

        if (userInDb) {
            throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
        }

        const user: User = await this.userRepository.create({ username, password, email });
        await this.userRepository.save(user);
        return toUserDto(user);
    }
}

