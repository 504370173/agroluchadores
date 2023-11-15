import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Client } from './entities/client.entity';
import { CreateClientDto } from './dto/create-client.dto';

@Injectable()
export class ClientService {
    constructor(
        @InjectRepository(Client)
        private clientService: Repository<Client>,
    ) {}

    async create(createClientDto: CreateClientDto): Promise<Client> {
        const clientAdded = this.clientService.create(createClientDto);
        await this.clientService.save(clientAdded);
        return clientAdded;
    }

    getAll(): Promise<Client[]> {
        return this.clientService.find();
    }

    getById(id: number): Promise<Client> {
        return this.clientService.findOne({ where: {id:id} });
    }

    async update(id: number, createClientDto: CreateClientDto): Promise<Client> {
        await this.clientService.update(id, createClientDto);
        return this.clientService.findOne({ where: {id:id} });
    }

    async delete(id: number) {
        const clientToDelete = await this.clientService.findOne({ where: {id:id} });

        if(!clientToDelete) {
            throw new HttpException('Client Not Found', HttpStatus.NOT_FOUND);
        }

        const deleted = await this.clientService.delete(id);

        if(deleted.affected === 0) {
            throw new HttpException('Failed to delete client', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}