import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';

import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
  ApiForbiddenResponse,
} from '@nestjs/swagger';

import type { Request } from 'express';

import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { LoginResponseDto } from './dto/login-response.dto';
import { AuthenticatedUserDto } from './dto/authenticated-user.dto';

import { JwtAuthGuard } from './guards/jwt-auth.guard';

import { Roles } from './decorators/roles.decorator';
import { RolesGuard } from './guards/roles.guard';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
  ) {}

  @Post('login')
  @ApiOperation({
    summary: 'Authenticate user',
    description:
      'Authenticate a user and return a JWT access token.',
  })
  @ApiOkResponse({
    description: 'Login successful',
    type: LoginResponseDto,
  })
  @ApiUnauthorizedResponse({
  description: 'Invalid email or password',
  })
  async login(
    @Body() dto: LoginDto,
  ) {
    return this.authService.login(
      dto.email,
      dto.password,
    );
  }

   

  @Get('me')
  @ApiBearerAuth()
  @ApiOperation({
        summary: 'Get authenticated user',
        description:
            'Return information about the currently authenticated user.',
  })
  @ApiOkResponse({
    description: 'Authenticated user information',
    type: AuthenticatedUserDto,
  })
  @ApiUnauthorizedResponse({
    description:
    'Missing or invalid authentication token',
  })
  @UseGuards(JwtAuthGuard)
  async me(
    @Req() request: Request,
  ) {
    return request.user;
  }

  
  @Get('admin-test')
  @ApiBearerAuth()
  @ApiOperation({
  summary: 'Test SUPER_ADMIN access',
  description:
    'Test whether the authenticated user has SUPER_ADMIN permission.',
  })
  @ApiOkResponse({
    description:
      'User has SUPER_ADMIN permission',
  })
  @ApiUnauthorizedResponse({
    description:
      'Missing or invalid authentication token',
  })
  @ApiForbiddenResponse({
    description:
      'User does not have SUPER_ADMIN permission',
  })
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