import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Category } from 'src/categories/entities/category.entity';
import { Inventory } from 'src/inventory/entities/inventory.entity';
import { InventoryService } from 'src/inventory/inventory.service';
// import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [TypeOrmModule.forFeature([Product, Category, Inventory])],
  controllers: [ProductsController],
  providers: [ProductsService, InventoryService], //JwtService
})
export class ProductsModule {}
