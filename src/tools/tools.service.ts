import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateToolsDto } from './dto/create-tools.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Tool } from './entities/tool.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ToolsService {

  constructor(
    @InjectRepository(Tool)
    private toolsService: Repository<Tool>,
  ) {}

  async create(createToolDto: CreateToolsDto): Promise<Tool> {
    const toolAdded = this.toolsService.create(createToolDto);
    await this.toolsService.save(toolAdded);
    return toolAdded;
  }

  getAll(): Promise<Tool[]> { 
    return this.toolsService.find();
  }

  getById(id: number): Promise<Tool> {
    return this.toolsService.findOne({ where: { id:id } })
  }

  async update(id: number, createToolDto: CreateToolsDto): Promise<Tool> {
    await this.toolsService.update(id, createToolDto);
    return this.toolsService.findOne({ where: { id:id } });
  }

  async delete(id: number) {
    const supplyToDelete = await this.toolsService.findOne({ where: { id:id } });

    if(!supplyToDelete) {
      throw new HttpException('Tool Not Found', HttpStatus.NOT_FOUND);
    }

    const deleted = await this.toolsService.delete(id);

    if(deleted.affected === 0) {
      throw new HttpException('Failed to delete Tool', HttpStatus.INTERNAL_SERVER_ERROR);
    }
    
  }
}
