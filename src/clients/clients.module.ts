import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientsController } from './clients.controller';
import { ClientService } from './clients.service';
import { Client } from './entities/client.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Client])],
    controllers: [ClientsController],
    providers: [ClientService], //JwtService
  })
  export class ClientsModule {}
  