import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { PlayersModule } from './players/players.module';
import { CoachesModule } from './coaches/coaches.module';
import { TeamsModule } from './teams/teams.module';
import { MatchesModule } from './matches/matches.module';
import { VenuesModule } from './venues/venues.module';
import { StandingsModule } from './standings/standings.module';
import { AuthModule } from'./auth/auth.module';
import { DatabaseModule } from './database/database.module';


@Module({   
  imports: [DatabaseModule, UsersModule, PlayersModule, CoachesModule, TeamsModule, MatchesModule, VenuesModule, StandingsModule, AuthModule], 
})

export class AppModule {}