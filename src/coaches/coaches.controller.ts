import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards, Request } from '@nestjs/common';
import { CoachesService } from './coaches.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('coaches')
export class CoachesController {
  constructor(private coachesService: CoachesService) {}
  
  @UseGuards(JwtAuthGuard)
  @Get()
  async getAll(){
    return this.coachesService.getAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getById(@Param('id') coach_id: number){
    return this.coachesService.findById(coach_id);
  }

  @Post()
  async create(@Body() body: { name: string; specialization: string; phone: string; email: string; team_code: string }) {
    return this.coachesService.createCoach( body.name, body.specialization, body.phone, body.email, body.team_code );
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async update(@Param('id') coach_id: number, @Body() body: any) {
    return this.coachesService.updateCoach(coach_id, body);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async delete(@Param('id') coach_id: number) {
    return this.coachesService.deleteCoach(coach_id);
  } 
}  