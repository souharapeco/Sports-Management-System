import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { TeamsService } from './teams.service';
import { TeamsController } from './teams.controller';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [
    DatabaseModule,
    PassportModule.register({ defaultStrategy: 'jwt' })
  ],
  controllers: [TeamsController],
  providers: [TeamsService],
  exports: [TeamsService],
})
export class TeamsModule {}