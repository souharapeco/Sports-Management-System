import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards, Request } from '@nestjs/common';
import { TeamsService } from './teams.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('teams')
export class TeamsController {
  constructor(private teamsService: TeamsService) {}
  
  @UseGuards(JwtAuthGuard)
  @Get()
  async getAll(){
    return this.teamsService.getAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getById(@Param('id') team_code: string){
    return this.teamsService.findById(team_code);
  }

  @Post()
  async create(@Body() body: { team_code: string; team_name: string; sport: string; division: string; founded_year: number; }) {
    return this.teamsService.createTeams(body.team_code, body.team_name, body.sport, body.division, body.founded_year);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async update(@Param('id') team_code: string, @Body() body: any) {
    return this.teamsService.updateTeams(team_code, body);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async delete(@Param('id') team_code: string) {
    return this.teamsService.deleteTeams(team_code);
  } 
}  