import { Body, Controller, Get, Post } from '@nestjs/common';
import { LocationsService } from './locations.service';
import { Location } from './entities/locations.entity';
import { CreateLocationDto } from './dto/create-location.dto';

@Controller('locations')
export class LocationsController {
  constructor(private readonly locationsService: LocationsService) {}

  @Get()
  async getAllLocations(): Promise<Location[]> {
    return this.locationsService.getAll();
  }

  @Post()
  async createLocation(
    @Body() createLocationDto: CreateLocationDto,
  ): Promise<Location> {
    return this.locationsService.create(createLocationDto);
  }
}
