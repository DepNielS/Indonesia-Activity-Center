import {
  Body,
  Controller,
  Get,
  Post,
  Patch,
  Param,
  Delete,
  NotFoundException,
} from '@nestjs/common';

import { ApiBearerAuth, ApiConflictResponse, ApiCreatedResponse, ApiForbiddenResponse, ApiNotFoundResponse,  ApiOkResponse, ApiOperation, ApiTags, ApiUnauthorizedResponse} from '@nestjs/swagger';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserResponseDto } from './dto/user-response.dto';

import { UsersService } from './user.service';


@ApiTags('Users')
@ApiBearerAuth()
@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
  ) {}

  @Get()
  @ApiOperation({
    summary: 'Get all users',
    description:
      'Return all registered users.',
  })
  @ApiOkResponse({
    description: 'List of users',
    type: UserResponseDto,
    isArray: true,
  })
  @ApiUnauthorizedResponse({
  description: 'Missing or invalid authentication token',
  })
  async findAll() {
    return this.usersService.findAll();
  }

  @Post()
  @ApiOperation({
    summary: 'Create user',
    description:
      'Create a new user account.',
  })
  @ApiCreatedResponse({
    description: 'User successfully created',
    type: UserResponseDto,
  })
  @ApiUnauthorizedResponse({
  description: 'Missing or invalid authentication token',
  })
  @ApiNotFoundResponse({
    description: 'User not found',
  })
  async createUser(
    @Body() dto: CreateUserDto,
  ) {
    return this.usersService.createUser(
      dto.name,
      dto.email,
      dto.password,
      dto.roleId,
    );
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get user by ID',
    description:
      'Return a single user by ID.',
  })
  @ApiOkResponse({
    description: 'User found',
    type: UserResponseDto,
  })
  @ApiUnauthorizedResponse({
    description: 'Missing or invalid authentication token',
  })
  @ApiNotFoundResponse({
    description: 'User not found',
  })
  async findById(
    @Param('id') id: string,
  ) {
    const user = await this.usersService.findById(
      Number(id),
    );

    if (!user) {
      throw new NotFoundException(
        'User not found',
      );
    }

  return user;
}

  @Patch(':id')
  @ApiOperation({
    summary: 'Update user',
    description:
      'Update an existing user account.',
  })
  @ApiOkResponse({
    description: 'User successfully updated',
    type: UserResponseDto,
  })
  @ApiUnauthorizedResponse({
  description: 'Missing or invalid authentication token',
  })
  @ApiForbiddenResponse({
    description: 'User does not have permission to update users',
  })
  @ApiNotFoundResponse({
    description: 'User not found',
  })
  @ApiConflictResponse({
    description: 'Email is already registered',
  })
  async updateUser(
    @Param('id') id: string,
    @Body() dto: UpdateUserDto,
  ) {
    return this.usersService.updateUser(
      Number(id),
      dto,
    );
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Deactivate user',
    description:
      'Deactivate a user account without permanently deleting the user.',
  })
  @ApiOkResponse({
    description: 'User successfully deactivated',
    type: UserResponseDto,
  })
  @ApiUnauthorizedResponse({
  description: 'Missing or invalid authentication token',
  })
  @ApiForbiddenResponse({
    description: 'User does not have permission to deactivate users',
  })
  @ApiNotFoundResponse({
    description: 'User not found',
  })
  async deactivateUser(
    @Param('id') id: string,
  ) {
    return this.usersService.deactivateUser(
      Number(id),
    );
  }


}