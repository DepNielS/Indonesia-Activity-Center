import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';

import type { Request } from 'express';

import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';

import { JwtAuthGuard } from './guards/jwt-auth.guard';

import { Roles } from './decorators/roles.decorator';
import { RolesGuard } from './guards/roles.guard';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
  ) {}

    @Post('login')
    async login(
        @Body() dto: LoginDto,
    ) {
        return this.authService.login(
        dto.email,
        dto.password,
        );
    }

    @Get('me')
    @UseGuards(JwtAuthGuard)
    async me(
        @Req() request: Request,
    ) {
        return request.user;
    }

  @Get('admin-test')
    @UseGuards(
    JwtAuthGuard,
    RolesGuard,
    )
    @Roles('SUPER_ADMIN')
    async adminTest() {
    return {
        message:
        'You are a SUPER_ADMIN',
    };
}


}