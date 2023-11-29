import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import {
  AuthService,
  LoginStatus,
  RegistrationStatus,
} from 'src/auth/auth.service';
import { CreateUserDto } from 'src/user/Dto/create.user.dto';
import { LoginUserDto } from 'src/user/Dto/login.user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  //recibe instancia del objeto CreateUserDto y delega la creación de un nuevo usuario
  //a la AuthService.register() función. Dependiendo del estado del registro, este controlador
  //de ruta podría generar una BAD:REQUEST excepción o el estado del registro real.
  @Post('register')
  public async register(
    @Body() createUserDto: CreateUserDto,
  ): Promise<RegistrationStatus> {
    const result: RegistrationStatus = await this.authService.register(
      createUserDto,
    );
    if (!result.success) {
      throw new HttpException(result.message, HttpStatus.BAD_REQUEST);
    }
    return result;
  }

  //devuelve la respuesata de la llamada a la función AuthService.login()
  //Si las credenciales del usuario son válidas, este controlador de ruta devuelve un JWT firmado
  //a la aplicación que realiza la llamada.
  @Post('login')
  public async login(@Body() loginUserDto: LoginUserDto): Promise<LoginStatus> {
    return await this.authService.login(loginUserDto);
  }
}
