import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { StandingsService } from './standings.service';
import { StandingsController } from './standings.controller';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [
    DatabaseModule,
    PassportModule.register({ defaultStrategy: 'jwt' })
  ],
  controllers: [StandingsController],
  providers: [StandingsService],
  exports: [StandingsService],
})
export class StandingsModule {}