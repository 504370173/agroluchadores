import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  HttpException,
  HttpStatus,
  ParseIntPipe,
  Put,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  createProduct(@Body() createProductDto: CreateProductDto): Promise<Product> {
    if (!createProductDto) {
      throw new HttpException('Product Not Found', HttpStatus.BAD_REQUEST);
    }
    return this.productsService.create(createProductDto);
  }

  @Get()
  async getAllProducts(): Promise<Product[]> {
    return this.productsService.getAll();
  }

  @Get(':id')
  async getByIdProduct(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<Product> {
    const productFound = await this.productsService.getById(id);

    if (!productFound) {
      throw new HttpException('Product Not Found', HttpStatus.NOT_FOUND);
    }
    return productFound;
  }

  @Put(':id')
  updateProduct(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateProductDto: UpdateProductDto,
  ): Promise<Product> {
    return this.productsService.update(+id, updateProductDto);
  }

  @Delete(':id')
  async deleteProduct(@Param('id', ParseIntPipe) id: number) {
    await this.productsService.delete(+id);
    return {
      message: 'Product deleted successfully',
    };
  }
}
