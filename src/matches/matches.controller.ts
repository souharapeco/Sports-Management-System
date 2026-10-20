import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards, Request } from '@nestjs/common';
import { MatchesService } from './matches.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('matches')
export class MatchesController {
  constructor(private matchesService: MatchesService) {}
  
  @UseGuards(JwtAuthGuard)
  @Get()
  async getAll(){
    return this.matchesService.getAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getById(@Param('id') match_id: number){
    return this.matchesService.findById(match_id);
  }

  @Post()
  async create(@Body() body: { venue_id: number; match_date: string; match_time: string; status: string; home_score: string; away_score: string }) {
    return this.matchesService.createMatch( body.venue_id, body.match_date, body.match_time, body.status, body.home_score, body.away_score );
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async update(@Param('id') match_id: number, @Body() body: any) {
    return this.matchesService.updateMatch(match_id, body);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async delete(@Param('id') match_id: number) {
    return this.matchesService.deleteMatch(match_id);
  } 
}  