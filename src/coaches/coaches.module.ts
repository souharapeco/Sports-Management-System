
import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { CoachesService } from './coaches.service';
import { CoachesController } from './coaches.controller';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [
    DatabaseModule,
    PassportModule.register({ defaultStrategy: 'jwt' })
  ],
  controllers: [CoachesController],
  providers: [CoachesService],
  exports: [CoachesService],
})
export class CoachesModule {}