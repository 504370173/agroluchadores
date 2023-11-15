import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, HttpStatus, ParseIntPipe, Put } from '@nestjs/common';
import { CreateSuppliersDto } from './dto/create-suppliers.dto';
import { SuppliersService } from './suppliers.service';
import { Supplier } from './entities/supplier.entity';


@Controller('suppliers')
export class SuppliersController {
  constructor(private readonly supplierService: SuppliersService) {}

  @Post()
  createSupplier(@Body() createSupplierDto: CreateSuppliersDto): Promise<Supplier> {
    if(!createSupplierDto) throw new HttpException('Supplier Not Found', HttpStatus.BAD_REQUEST);

    return this.supplierService.create(createSupplierDto);
  }



  @Get()
  getAllSuppliers(): Promise<Supplier[]> {
    return this.supplierService.getAll();
  }

  @Get(':id')
  async getById(@Param('id', ParseIntPipe) id: number): Promise<Supplier> {
    const supplierFound = await this.supplierService.getById(id);

    if(!supplierFound) throw new HttpException('Supplier Not Found', HttpStatus.NOT_FOUND);

    return supplierFound;
  }

  @Put(':id')
  updateSupplier(@Param('id', ParseIntPipe) id: number, @Body() createSupplierDto: CreateSuppliersDto): Promise<Supplier> {
    return this.supplierService.update(+id, createSupplierDto);
  }

  @Delete(':id')
  async deleteSupplier(@Param('id', ParseIntPipe) id: number) {
    await this.supplierService.delete(+id);
    return {
      message: 'Supplier- deleted successfully'
    };
  }
}
