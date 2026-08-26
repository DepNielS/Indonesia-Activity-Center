import { Module } from '@nestjs/common';

import { DatabaseModule } from '../../db/database.module';

import { UsersController } from './users.controller';
import { UsersService } from './user.service';


@Module({
  imports: [
    DatabaseModule,
  ],
  controllers: [
    UsersController,
  ],
  providers: [
    UsersService,
  ],
  exports: [
    UsersService,
  ],
})
export class UsersModule {}