import { Body, Controller, Get, Post } from '@nestjs/common';
import { InventoryService } from './inventory.service';
import { Inventory } from './entities/inventory.entity';
import { CreateInventoryDto } from './dto/create-inventory.dto';

@Controller('inventories')
export class InventoryController {
  constructor(private readonly inventoryService: InventoryService) {}

  @Get()
  async getAllInventories(): Promise<Inventory[]> {
    return this.inventoryService.getAll();
  }

  @Post()
  async createInventory(
    @Body() createInventoryDto: CreateInventoryDto,
  ): Promise<Inventory> {
    return this.inventoryService.create(createInventoryDto);
  }
}
