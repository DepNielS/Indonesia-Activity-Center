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

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

import { UsersService } from './user.service';



@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
  ) {}

  @Get()
  async findAll() {
    return this.usersService.findAll();
  }

  @Post()
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
  async deactivateUser(
    @Param('id') id: string,
  ) {
    return this.usersService.deactivateUser(
      Number(id),
    );
  }


}