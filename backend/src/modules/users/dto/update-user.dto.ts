import {
  IsEmail,
  IsInt,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';

import {
  ApiPropertyOptional,
} from '@nestjs/swagger';

export class UpdateUserDto {
  @ApiPropertyOptional({
    example: 'Updated Administrator',
    description: 'Updated full name of the user',
  })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional({
    example: 'updated@example.com',
    description: 'Updated email address of the user',
  })
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiPropertyOptional({
    example: 'NewPassword123!',
    description: 'New user password, minimum 8 characters',
    minLength: 8,
  })
  @IsOptional()
  @IsString()
  @MinLength(8)
  password?: string;

  @ApiPropertyOptional({
    example: 2,
    description: 'Updated role ID',
  })
  @IsOptional()
  @IsInt()
  roleId?: number;
}