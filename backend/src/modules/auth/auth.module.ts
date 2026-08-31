import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

import { UsersModule } from '../users/users.module';

import { JwtStrategy } from './strategies/jwt.strategy';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { RolesGuard } from './guards/roles.guard';

import { RolesService } from './services/roles.service';

import type { StringValue } from 'ms';

@Module({
  imports: [
    UsersModule,

    PassportModule,

    JwtModule.registerAsync({
      imports: [ConfigModule],

      inject: [ConfigService],

      useFactory: (configService: ConfigService) => {
        const jwtSecret =
          configService.get<string>('JWT_SECRET');

        if (!jwtSecret) {
          throw new Error(
            'JWT_SECRET is not configured',
          );
        }

        const jwtExpiresIn =
          configService.get<string>(
            'JWT_EXPIRES_IN',
          ) ?? '1d';

        return {
          secret: jwtSecret,

          signOptions: {
            expiresIn:
              jwtExpiresIn as StringValue,
          },
        };
      },
    }),
  ],

  controllers: [
    AuthController,
  ],

  providers: [
    AuthService,
    JwtStrategy,
    JwtAuthGuard,
    RolesGuard,
    RolesService,
  ],

  exports: [
    AuthService,
    JwtAuthGuard,
    RolesGuard,
    RolesService,
  ],
})
export class AuthModule {}