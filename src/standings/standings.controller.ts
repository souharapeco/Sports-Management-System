import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards, Request } from '@nestjs/common';
import { StandingsService } from './standings.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('standings')
export class StandingsController {
  constructor(private standingsService: StandingsService) {}
  
  @UseGuards(JwtAuthGuard)
  @Get()
  async getAll(){
    return this.standingsService.getAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getById(@Param('id') match_id: number){
    return this.standingsService.findById(match_id);
  }

  @Post()
  async create(@Body() body: { team_code: string; wins: number; losses: number; points: number; ranking: string }) {
    return this.standingsService.createStandings( body.team_code, body.wins, body.losses, body.points, body.ranking);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async update(@Param('id') standings_id: number, @Body() body: any) {
    return this.standingsService.updateStandings(standings_id, body);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async delete(@Param('id') standings_id: number) {
    return this.standingsService.deleteStandings(standings_id);
  } 
}  