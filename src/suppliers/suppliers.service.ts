import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateSuppliersDto } from './dto/create-suppliers.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Supplier } from './entities/supplier.entity';
import { Repository, In } from 'typeorm';
import { Supply } from 'src/supplies/entities/supply.entity';
import { Tool } from 'src/tools/entities/tool.entity';

@Injectable()
export class SuppliersService {
  constructor(
    @InjectRepository(Supplier)
    private supplierRepository: Repository<Supplier>,
    @InjectRepository(Supply)
    private supplyRepository: Repository<Supply>,
    @InjectRepository(Tool) 
    private toolRepository: Repository<Tool>,   
  ) {}

  // async create(createSupplierDto: CreateSuppliersDto): Promise<Supplier> {
  //   const { supplyId, toolId, ...supplierData } = createSupplierDto;
    
  //    // Verificar si supplyId existe
  //     const supply = await this.supplyRepository.findOne({ where: { id: In(supplyId) } });
  //   if (!supply) {
  //      throw new HttpException('Supply Not Found', HttpStatus.NOT_FOUND);
  //    }

  //    console.log('Supply:', supply);
 
  //    // Verificar si toolId existe
  //    const tool = await this.toolRepository.findOne({ where: { id: In(toolId) } });
  //    if (!tool) {
  //      throw new HttpException('Tool Not Found', HttpStatus.NOT_FOUND);
  //    }

  //    console.log('Tool:', tool);
 
  //    const supplierAdded = this.supplierRepository.create(supplierData);
 
  //    supplierAdded.supplies = [supply];
  //    supplierAdded.tools = [tool];
 
  //    await this.supplierRepository.save(supplierAdded);
  //    return supplierAdded;
  // }

  async create(proveedorDto: CreateSuppliersDto): Promise<Supplier> {
    const proveedor = new Supplier();
    const supplyEntities = await this.supplyRepository.findByIds(proveedorDto.supplyId);
    const toolEntities = await this.toolRepository.findByIds(proveedorDto.toolId);

    if (!supplyEntities || supplyEntities.length !== proveedorDto.supplyId.length) {
      throw new HttpException('Supplies Not Found', HttpStatus.NOT_FOUND);
    }

    if (!toolEntities || toolEntities.length !== proveedorDto.toolId.length) {
      throw new HttpException('Tools Not Found', HttpStatus.NOT_FOUND);
    }

    proveedor.name = proveedorDto.name;
    proveedor.email = proveedorDto.email;
    proveedor.phone = proveedorDto.phone;
    proveedor.supplies = supplyEntities;
    proveedor.tools = toolEntities;

    return this.supplierRepository.save(proveedor);
  }
  

  getAll(): Promise<Supplier[]> { //list of
    return this.supplierRepository.find({ relations: ['supplies', 'tools'] });
  }

  getById(id: number): Promise<Supplier> {
    return this.supplierRepository.findOne({ where: {id}, relations: ['supplies', 'tools'] });
  }

  async update(id: number, createSupplierDto: CreateSuppliersDto): Promise<Supplier> {
    await this.supplierRepository.update(id, createSupplierDto);
    return this.supplierRepository.findOne({ where: { id:id } });
  }

  async delete(id: number) {
  const supplierToDelete = await this.supplierRepository.findOne({ where: { id:id } });

  if(!supplierToDelete) {
    throw new HttpException('Supplier Not Found', HttpStatus.NOT_FOUND);
  }

  const deleted = await this.supplierRepository.delete(id);

  if(deleted.affected === 0) {
    throw new HttpException('Failed to delete supplier', HttpStatus.INTERNAL_SERVER_ERROR);
  }
}
}
