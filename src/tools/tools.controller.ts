import { Controller, Get, Put, Post, Body, Param, Delete, HttpException, HttpStatus, ParseIntPipe } from '@nestjs/common';
import { ToolsService } from './tools.service';
import { CreateToolsDto } from './dto/create-tools.dto';
import { Tool } from './entities/tool.entity';


@Controller('tools')
export class ToolsController {
  constructor(private readonly toolService: ToolsService) {}

  @Post()
  createTool(@Body() createToolDto: CreateToolsDto): Promise<Tool> {
    if(!createToolDto) {
      throw new HttpException('Tool Not Found', HttpStatus.BAD_REQUEST);
    }
    return this.toolService.create(createToolDto);
  }

  @Get()
  getAllTools(): Promise<Tool[]> {
    return this.toolService.getAll();
  }

  @Get(':id')
  async getByIdTool(@Param('id', ParseIntPipe) id: number): Promise<Tool> {
    const toolFound = await this.toolService.getById(id);

    if(!toolFound) {
      throw new HttpException('Tool Not Found', HttpStatus.NOT_FOUND);
    }
    return toolFound;
  }

  @Put(':id')
  updateTool(@Param('id', ParseIntPipe) id: number, @Body() createToolDto: CreateToolsDto): Promise<Tool> {
    return this.toolService.update(+id, createToolDto);
  }

  @Delete(':id')
  async deleteTool(@Param('id', ParseIntPipe) id: number) {
    await this.toolService.delete(+id);
    return {
      message: 'Tool deleted successfully'
    };
  }
}
