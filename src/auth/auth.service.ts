import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { UserService } from "../user/user.service";
import { JwtService } from "@nestjs/jwt"; //expone utilidades para ayudar a firmar una carga útil JWT.
import { CreateUserDto } from "src/user/Dto/create.user.dto";
import { LoginUserDto } from "src/user/Dto/login.user.dto";
import { UserDto } from "src/user/Dto/user.dto";
import { JwtPayload } from "src/auth/jwt.strategy";
import { ConfigService } from "@nestjs/config";

export interface RegistrationStatus {
    success: boolean;
    message: string;
}

export interface LoginStatus {
    username: string;
    token: string;
}


@Injectable()
export class AuthService {
    constructor(private readonly usersService: UserService, private readonly jwtService: JwtService, private configService: ConfigService) { }


    //Toma CreateUserDto como parámetro de entrada y delega la creación
    //del usuario real a la función UserService.create(). Devuelve un RegistrationStatus
    //para indicar una creación de usuario exitosa o faliida.

    async register(UserDto: CreateUserDto): Promise<RegistrationStatus> {
        let status: RegistrationStatus = {
            success: true,
            message: 'user registered',
        };
        try {
            await this.usersService.create(UserDto);
        } catch (err) {
            status = {
                success: false,
                message: err,
            };
        }

        return status;
    }


    //Recibe LoginUserDto como parámetro de entrada. Internamente, utiliza
    //UsersService.findByLogin() para validar credenciales del usuario

    async login(loginUserDto: LoginUserDto): Promise<LoginStatus> {
        //halla usuario en BD
        const user = await this.usersService.findByLogin(loginUserDto); //valida credenciales de usuario

        //genera y firma token
        const token = this._createToken(user);

        return {
            username: user.username, ...token,
        };
    }

    private _createToken({ username }: UserDto): any {
        const user: JwtPayload = { username };
        const accessToken = this.jwtService.sign(user); //Prepara la carga útil JWT y la firma. Finalmente, devuelve token firmado junto con el username.
        return {
            expiresIn: this.configService.get('EXPIRESIN'),//process.env.EXPIRESIN,
            accessToken,
        };
    }

    //Recibe la carga útil JWT como entrada y recupera al usuario de la BD mediante  UsersService.findByPayload()la función.
    async validateUser(payload: JwtPayload): Promise<UserDto> {
        const user = await this.usersService.findByPayload(payload);
        if (!user) {
            throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
        }
        return user;
    }
}