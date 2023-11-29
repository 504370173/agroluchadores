import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { InventoryService } from 'src/inventory/inventory.service';
import { CreateInventoryDto } from 'src/inventory/dto/create-inventory.dto';
import { CreateLocationDto } from 'src/locations/dto/create-location.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
    private readonly inventoryService: InventoryService,
  ) {}

  async create(createProductDto: CreateProductDto): Promise<Product> {
    const productAdded = this.productRepository.create(createProductDto);
    const product = await this.productRepository.save(productAdded);

    const inventory = this.parseToInventoryDto(product.id, createProductDto);
    this.inventoryService.create(inventory);

    return productAdded;
  }

  async getAll(): Promise<Product[]> {
    const relations = ['category'];
    return this.productRepository.find({ relations });
  }

  getById(id: number): Promise<Product> {
    return this.productRepository.findOne({ where: { id: id } });
  }

  async update(
    id: number,
    updateProductDto: UpdateProductDto,
  ): Promise<Product> {
    await this.productRepository.update(id, updateProductDto);
    return this.productRepository.findOne({ where: { id: id } });
  }

  async delete(id: number) {
    // Intenta encontrar el producto por su ID
    const productToDelete = await this.productRepository.findOne({
      where: { id: id },
    });

    if (!productToDelete) {
      throw new HttpException('Product Not Found', HttpStatus.NOT_FOUND);
    }

    //Borra el producto
    const deleted = await this.productRepository.delete(id);

    if (deleted.affected === 0) {
      throw new HttpException(
        'Failed to delete product',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  private parseToInventoryDto(
    productId: number,
    product: CreateProductDto,
  ): CreateInventoryDto {
    const { location, status, stock } = product;
    const inventory: CreateInventoryDto = {
      location: location as unknown as CreateLocationDto,
      product: productId as unknown as CreateProductDto,
      status: status,
      stock: stock,
    };

    return inventory;
  }
}
