import { Controller, Get, Post, Body, Param, Delete, HttpException, HttpStatus, ParseIntPipe, Put } from '@nestjs/common';
import { CreateSuppliesDto } from './dto/create-supplies.dto';
import { Supply } from './entities/supply.entity';
import { SuppliesService } from './supplies.service';


@Controller('supplies')
export class SuppliesController {
  constructor(private readonly supplyService: SuppliesService) {}

  @Post()
  createSupply(@Body() createSupplyDto: CreateSuppliesDto): Promise<Supply> {
    if(!createSupplyDto) {
      throw new HttpException('Supply Not Found', HttpStatus.BAD_REQUEST);
    }
    return this.supplyService.create(createSupplyDto);
  }

  @Get()
  getAllSupplies(): Promise<Supply[]> {
    return this.supplyService.getAll();
  }

  @Get(':id')
  async getByIdSupply(@Param('id', ParseIntPipe) id: number): Promise<Supply> {
    const supplyFound = await this.supplyService.getById(id);

    if(!supplyFound) {
      throw new HttpException('Supply Not Found', HttpStatus.NOT_FOUND);
    }
    return supplyFound;
  }

  @Put(':id')
  updateSupply(@Param('id', ParseIntPipe) id: number, @Body() updateSupplyDto: CreateSuppliesDto): Promise<Supply> {
    return this.supplyService.update(+id, updateSupplyDto);
  }

  @Delete(':id')
  async deleteSupply(@Param('id', ParseIntPipe) id: number) {
    await this.supplyService.delete(+id);
    return {
      message: 'Supply deleted successfully'
    };
  }
}
