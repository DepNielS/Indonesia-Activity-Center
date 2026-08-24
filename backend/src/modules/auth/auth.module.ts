import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { JwtStrategy } from './strategies/jwt.strategy';

import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    UsersModule,

    PassportModule,

    JwtModule.registerAsync({
      inject: [
        ConfigService,
      ],

      useFactory: (
        configService: ConfigService,
      ) => {
        const jwtSecret =
          configService.get<string>(
            'JWT_SECRET',
          );

        if (!jwtSecret) {
          throw new Error(
            'JWT_SECRET is not configured',
          );
        }

        return {
          secret: jwtSecret,

          signOptions: {
            expiresIn: '1h',
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
  ],

  exports: [
    AuthService,
  ],
})
export class AuthModule {}