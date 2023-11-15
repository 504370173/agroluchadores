import { Controller, Get, Post, Body, Param, Delete, HttpException, HttpStatus, ParseIntPipe, Put } from '@nestjs/common';
import { ClientService } from './clients.service';
import { CreateClientDto } from './dto/create-client.dto';
import { Client } from './entities/client.entity';

@Controller('clients')
export class ClientsController {
    constructor(private readonly clientsService: ClientService) {}

    @Post()
    createClient(@Body() createClientDto: CreateClientDto): Promise<Client> {
        if(!createClientDto) {
        throw new HttpException('Client Not Found', HttpStatus.BAD_REQUEST);
        }
        return this.clientsService.create(createClientDto);
    }

    @Get()
    getAllClients(): Promise<Client[]> {
        return this.clientsService.getAll();
    }

    @Get(':id')
    async getByClient(@Param('id', ParseIntPipe) id: number): Promise<Client> {
        const clientFound = await this.clientsService.getById(id);

        if(!clientFound) {
            throw new HttpException('Client. Not Found', HttpStatus.NOT_FOUND);
        }
        return clientFound;
    }

    @Put(':id')
    updateClient(@Param('id', ParseIntPipe) id: number, @Body() updatedClient: CreateClientDto): Promise<Client> {
        return this.clientsService.update(+id, updatedClient);
    }

    @Delete(':id')
    async deleteClient(@Param('id', ParseIntPipe) id: string) {
        await this.clientsService.delete(+id);
        return {
            message: 'Client deleted successfully'
        };
    }
}