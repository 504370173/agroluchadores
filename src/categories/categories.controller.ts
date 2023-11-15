import { Controller, Get, Post, Body, Param, Delete, HttpException, HttpStatus, ParseIntPipe, Put } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './entities/category.entity';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post()
  createCategory(@Body() createCategoryDto: CreateCategoryDto): Promise<Category> {
    if(!createCategoryDto) {
      throw new HttpException('Category Not Found', HttpStatus.BAD_REQUEST);
    }
    return this.categoriesService.create(createCategoryDto);
  }

  @Get()
  getAllCategories(): Promise<Category[]> {
    return this.categoriesService.getAll();
  }

  @Get(':id')
  async getByIdCategory(@Param('id', ParseIntPipe) id: number): Promise<Category> {
    const categoryFound = await this.categoriesService.getById(id);

    if(!categoryFound) {
      throw new HttpException('Category Not Found', HttpStatus.NOT_FOUND);
    }
    return categoryFound;
  }

  @Put(':id')
  updateCategory(@Param('id', ParseIntPipe) id: number, @Body() updateCategoryDto: UpdateCategoryDto): Promise<Category> {
    return this.categoriesService.update(+id, updateCategoryDto);
  }

  @Delete(':id')
  async deleteCategory(@Param('id', ParseIntPipe) id: string) {
    await this.categoriesService.delete(+id);
    return {
      message: 'Category deleted successfully'
    };
  }
}
