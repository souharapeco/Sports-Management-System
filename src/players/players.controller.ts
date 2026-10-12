import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards, Request } from '@nestjs/common';
import { PlayersService } from './players.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('players')
export class PlayersController {
  constructor(private playersService: PlayersService) {}
  
  @UseGuards(JwtAuthGuard)
  @Get()
  async getAll(){
    return this.playersService.getAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getById(@Param('id') players_id: number){
    return this.playersService.findById(players_id);
  }

  @Post()
  async create(@Body() body: { first_name: string; last_name: string; birth_date: string; gender: string; phone: number; email: string; position: string; team_code: string }) {
    return this.playersService.createPlayer(body.first_name, body.last_name, body.birth_date, body.gender, body.phone, body.email, body.position, body.team_code);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async update(@Param('id') players_id: number, @Body() body: any) {
    return this.playersService.updatePlayer(players_id, body);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async delete(@Param('id') players_id: number) {
    return this.playersService.deletePlayer(players_id);
  } 
}  
