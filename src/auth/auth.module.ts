import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from 'src/user/user.module';
import { AuthService } from 'src/auth/auth.service';
import { JwtStrategy } from './jwt.strategy';
import { AuthController } from 'src/auth/auth.controller';
import { JwtConfigAsync } from './jwt.config';


//Módulo de autenticación
//expondrá el punto final (/auth) para permitir el registro de usuario
// el inicio de sesion y la protección de la privacidad en la App. 


// Importa UsersModule para habilitar el uso de UsersService.
// Importa el PassportModule proporcionado por el paquete @nestjs/passport.
// También configura este módulo especificando explícitamente la estrategia predeterminada que se utilizará 
//para autenticar a los usuarios; en este caso, es la estrategia jwt.
// Importa el JwtModule proporcionado por el paquete @nestjs/jwt. Este módulo proporciona funciones de utilidad relacionadas 
//con la autenticación JWT. La única función que le interesa de este módulo es la sign()función que utilizará para firmar los tokens.
// El módulo requiere configurar el tiempo de caducidad de JWT y el código secreto que se utiliza para firmar el token.
// Proporciona la JwtStrategyclase. La implementación de esta clase se discutirá muy pronto.
// Exporta PassportModule y JwtModule para que otros módulos de la aplicación puedan importar AuthModule y utilizar 
//el AuthGuard()decorador para proteger controladores de ruta o controladores completos.

@Module({
    imports: [
        UserModule,
        PassportModule.register({
            defaultStrategy: 'jwt',
            property: 'user',
            session: false,
        }),
        JwtModule.registerAsync(JwtConfigAsync
        ),
    ],
    controllers: [AuthController],
    providers: [AuthService, JwtStrategy],
    exports: [
        PassportModule,
        JwtModule
    ],
})
export class AuthModule { }