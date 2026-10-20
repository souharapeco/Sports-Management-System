import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards, Request } from '@nestjs/common';
import { VenuesService } from './venues.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('venues')
export class VenuesController {
  constructor(private venuesService: VenuesService) {}
  
  @UseGuards(JwtAuthGuard)
  @Get()
  async getAll(){
    return this.venuesService.getAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getById(@Param('id') venue_id: number){
    return this.venuesService.findById(venue_id);
  }

  @Post()
  async create(@Body() body: { venue_name: string; location: string; capacity: string; facility_type: string }) {
    return this.venuesService.createVenue( body.venue_name, body.location, body.capacity, body.facility_type );
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async update(@Param('id') venue_id: number, @Body() body: any) {
    return this.venuesService.updateVenue(venue_id, body);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async delete(@Param('id') venue_id: number) {
    return this.venuesService.deleteVenue(venue_id);
  } 
}  