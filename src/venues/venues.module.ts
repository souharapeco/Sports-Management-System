import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { VenuesService } from './venues.service';
import { VenuesController } from './venues.controller';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [
    DatabaseModule,
    PassportModule.register({ defaultStrategy: 'jwt' })
  ],
  controllers: [VenuesController],
  providers: [VenuesService],
  exports: [VenuesService],
})
export class VenuesModule {}