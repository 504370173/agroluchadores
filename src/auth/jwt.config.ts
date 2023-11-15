import { ConfigModule, ConfigService } from "@nestjs/config";
import { JwtModuleOptions, JwtModuleAsyncOptions } from "@nestjs/jwt/dist/interfaces/jwt-module-options.interface";

//The way to save secrets in an env file and then loading them
//through the configuration manager.

export default class JwtConfig {
    static getJwtConfig(configService: ConfigService): JwtModuleOptions {
        //It sends us an object of type TypeORM module options
        return {
            secret: configService.get('SECRETKEY'),
            signOptions: {
                expiresIn: configService.get('EXPIRESIN'),
            }
        };
    }
}

//How we create the instance and send that function 
export const JwtConfigAsync: JwtModuleAsyncOptions = {
    imports: [ConfigModule],
    //An async function can pass inside factory
    useFactory: async (configService: ConfigService):
        //We expect a promise of same type which is exactly what we are returning
        Promise<JwtModuleAsyncOptions> =>
        //then, we call our typeOrmConfig class
        JwtConfig.
            getJwtConfig(configService),
    inject: [ConfigService]
}

//To support the nest dependency management
//We declare ConfigModule by importing it inside this closure (cláusula)
//and also injecting the ConfigService



