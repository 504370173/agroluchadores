import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as morgan from 'morgan';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });

  app.use(morgan('dev'));

  app.setGlobalPrefix('api');

  app.useGlobalPipes(new ValidationPipe());

  //whitelist->Elimina propiedades del cuerpo de una solicitud que no están en el DTO
  //transform-> Transforma propiedades, ejemplo, un número entero e una cadena.
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

  app.enableCors({
    allowedHeaders: '*',
    origin: '*',
    methods: ['GET', 'POST', 'HEAD', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    credentials: true,
  });

  await app.listen(AppModule.port);
}

bootstrap();
