import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CategoriesService {

  constructor(
    @InjectRepository(Category)
    private categoryService: Repository<Category>,
  ) {}

  async create(createCategoryDto: CreateCategoryDto): Promise<Category> {
    const productAdded = this.categoryService.create(createCategoryDto);
    await this.categoryService.save(productAdded);
    return productAdded;
  }

  getAll(): Promise<Category[]> { //list of categories
    return this.categoryService.find({ relations: ['products'] });
  }

  getById(id: number): Promise<Category> {
    return this.categoryService.findOne({ where: {id}, relations: ['products'] });
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto): Promise<Category> {
    await this.categoryService.update(id, updateCategoryDto);
    return this.categoryService.findOne({ where: { id:id } });
  }

  async delete(id: number) {
    const productToDelete = await this.categoryService.findOne({ where: { id:id } });

    if(!productToDelete) {
      throw new HttpException('Category Not Found', HttpStatus.NOT_FOUND);
    }

    const deleted = await this.categoryService.delete(id);

    if(deleted.affected === 0) {
      throw new HttpException('Failed to delete category', HttpStatus.INTERNAL_SERVER_ERROR);
    }
    
  }
}
