import { Module } from '@nestjs/common';
import { LocationsService } from './locations.service';
import { LocationsController } from './locations.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Location } from './entities/locations.entity';
import { Inventory } from 'src/inventory/entities/inventory.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Location, Inventory])],
  controllers: [LocationsController],
  providers: [LocationsService],
})
export class LocationsModule {}
