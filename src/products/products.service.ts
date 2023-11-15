import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ProductsService {

  constructor( 
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {}

  async create(createProductDto: CreateProductDto): Promise<Product> {
    console.log(createProductDto); // Agrega esta línea para verificar los datos
    const productAdded = this.productRepository.create(createProductDto);
    await this.productRepository.save(productAdded);
    return productAdded;
  }

  // getAll(): Promise<Product[]> { //list of products
  //   return this.productRepository.find();
  // }
  async getAll(): Promise<Product[]> { //list of products
    return this.productRepository.createQueryBuilder('product') // .createQueryBuilder para construir una consulta que recupera los productos 
    .leftJoinAndSelect('product.category', 'category') // leftJoinAndSelect para cargar la relación con la categoría. Esto te proporcionará una lista de productos con sus categorías correspondientes
    .getMany();
  }

  getById(id: number): Promise<Product> {
    return this.productRepository.findOne({ where: {id:id} });
  }

  async update(id: number, updateProductDto: UpdateProductDto): Promise<Product> {
    await this.productRepository.update(id, updateProductDto);
    return this.productRepository.findOne({ where: {id: id} });
  }

  async delete(id: number) {
      // Intenta encontrar el producto por su ID
    const productToDelete = await this.productRepository.findOne({ where: { id:id } });

    if(!productToDelete) {
      throw new HttpException('Product Not Found', HttpStatus.NOT_FOUND);
    }

    //Borra el producto
    const deleted = await this.productRepository.delete(id);

    if(deleted.affected === 0) {
      throw new HttpException('Failed to delete product', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

}