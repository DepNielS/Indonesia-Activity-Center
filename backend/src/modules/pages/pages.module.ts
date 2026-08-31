import { Module } from '@nestjs/common';

import { PagesController } from './pages.controller';
import { PagesService } from './pages.service';

import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    AuthModule,
  ],

  controllers: [
    PagesController,
  ],

  providers: [
    PagesService,
  ],

  exports: [
    PagesService,
  ],
})
export class PagesModule {}