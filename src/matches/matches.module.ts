import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { MatchesService } from './matches.service';
import { MatchesController } from './matches.controller';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [
    DatabaseModule,
    PassportModule.register({ defaultStrategy: 'jwt' })
  ],
  controllers: [MatchesController],
  providers: [MatchesService],
  exports: [MatchesService],
})
export class MatchesModule {}