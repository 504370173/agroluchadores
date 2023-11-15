import { Module } from '@nestjs/common';
import { SuppliersController } from './suppliers.controller';
import { SuppliersService } from './suppliers.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Supplier } from './entities/supplier.entity';
import { Supply } from 'src/supplies/entities/supply.entity';
import { Tool } from 'src/tools/entities/tool.entity';


@Module({
  imports: [TypeOrmModule.forFeature([Supplier, Supply, Tool])],
  controllers: [SuppliersController],
  providers: [SuppliersService],
})
export class SuppliersModule {}
