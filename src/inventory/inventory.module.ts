import { Module } from '@nestjs/common';
import { InventoryService } from './inventory.service';
import { InventoryController } from './inventory.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from 'src/products/entities/product.entity';
import { Inventory } from './entities/inventory.entity';
import { Location } from 'src/locations/entities/locations.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Location, Product, Inventory])],
  controllers: [InventoryController],
  providers: [InventoryService],
})
export class InventoryModule {}
