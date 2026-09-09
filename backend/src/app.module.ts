import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './modules/users/users.module';
import { AppController } from './app.controller';
import { DatabaseModule } from './db/database.module';
import { AuthModule } from './modules/auth/auth.module';
import { HealthModule } from './modules/health/health.module';
import { EventsModule } from './modules/events/events.module';
import { PagesModule } from './modules/pages/pages.module';
import { ActivitiesModule } from './modules/activities/activities.module';
import { ActivityCategoriesModule } from './modules/activities-category/activity-categories..module';
import { SupabaseModule } from './supabase/supabase.module';
import { UploadsModule } from './modules/uploads/uploads.module';
import { envValidationSchema } from './config/env.validation';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: envValidationSchema,
    }),
    SupabaseModule,
    UploadsModule,
    DatabaseModule,
    UsersModule,
    AuthModule,
    EventsModule,
    PagesModule,
    HealthModule,
    ActivitiesModule,
    ActivityCategoriesModule,

  ],
    controllers: [AppController],

})
export class AppModule {}