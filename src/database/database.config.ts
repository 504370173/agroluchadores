import { ConfigModule, ConfigService } from '@nestjs/config';
import {
  TypeOrmModuleOptions,
  TypeOrmModuleAsyncOptions,
} from '@nestjs/typeorm';

//The way to save secrets in an env file and then loading them
//through the configuration manager.

export default class TypeOrmConfig {
  static getOrmConfig(configService: ConfigService): TypeOrmModuleOptions {
    //It sends us an object of type TypeORM module options
    return {
      type: 'mysql',
      host: configService.get('DB_HOST'),
      port: configService.get('DB_PORT'),
      username: configService.get('DB_USERNAME'),
      password: configService.get('DB_PASSWORD'),
      database: configService.get('DB_NAME'),
      autoLoadEntities: true,
      synchronize: true,
      logging: true,
    };
  }
}

//How we create the instance and send that function
export const typeOrmConfigAsync: TypeOrmModuleAsyncOptions = {
  imports: [ConfigModule],
  //An async function can pass inside factory
  useFactory: async (
    configService: ConfigService,
  ): //We expect a promise of same type which is exactly what we are returning
  Promise<TypeOrmModuleOptions> =>
    //then, we call our typeOrmConfig class
    TypeOrmConfig.getOrmConfig(configService),
  inject: [ConfigService],
};

//To support the nest dependency management
//We declare ConfigModule by importing it inside this closure (cláusula)
//and also injecting the ConfigService
