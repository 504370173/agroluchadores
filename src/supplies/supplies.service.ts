import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateSuppliesDto } from './dto/create-supplies.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Supply } from './entities/supply.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SuppliesService {

  constructor(
    @InjectRepository(Supply)
    private supplyService: Repository<Supply>,
  ) {}

  async create(createSupplyDto: CreateSuppliesDto): Promise<Supply> {
    const supplyAdded = this.supplyService.create(createSupplyDto);
    await this.supplyService.save(supplyAdded);
    return supplyAdded;
  }

  getAll(): Promise<Supply[]> { 
    return this.supplyService.find();
  }

  getById(id: number): Promise<Supply> {
    return this.supplyService.findOne({ where: { id:id } })
  }

  async update(id: number, createSupplyDto: CreateSuppliesDto): Promise<Supply> {
    await this.supplyService.update(id, createSupplyDto);
    return this.supplyService.findOne({ where: { id:id } });
  }

  async delete(id: number) {
    const supplyToDelete = await this.supplyService.findOne({ where: { id:id } });

    if(!supplyToDelete) {
      throw new HttpException('Supply Not Found', HttpStatus.NOT_FOUND);
    }

    const deleted = await this.supplyService.delete(id);

    if(deleted.affected === 0) {
      throw new HttpException('Failed to delete Supply', HttpStatus.INTERNAL_SERVER_ERROR);
    }
    
  }
}
