import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from 'src/auth/auth.service';
import { UserDto } from 'src/user/Dto/user.dto';

export interface JwtPayload { username: string; }

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly authService: AuthService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // Esto configura la estrategia (importada del paquete passpass-jwt) para buscar el JWT en el encabezado de autorización de la solicitud actual pasada como token de portador.
            secretOrKey: process.env.SECRETKEY, //Esto configura la clave secreta que JWT Strategy utilizará para descifrar el token JWT con el fin de validarlo y acceder a su carga útil.
        });
    }

    async validate(payload: JwtPayload): Promise<UserDto> {
        const user = await this.authService.validateUser(payload);

        if (!user) {
            throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
        }
        return user;
    }
}










