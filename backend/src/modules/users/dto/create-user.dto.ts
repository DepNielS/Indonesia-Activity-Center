import {
  IsEmail,
  IsInt,
  IsNotEmpty,
  IsString,
  MinLength,
} from 'class-validator';

import {
  ApiProperty,
} from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    example: 'Administrator',
    description: 'Full name of the user',
  })
  @IsString()
  @IsNotEmpty()
  name!: string;

  @ApiProperty({
    example: 'admin@example.com',
    description: 'Unique email address of the user',
  })
  @IsEmail()
  email!: string;

  @ApiProperty({
    example: 'Password123!',
    description: 'User password, minimum 8 characters',
    minLength: 8,
  })
  @IsString()
  @MinLength(8)
  password!: string;

  @ApiProperty({
    example: 1,
    description: 'ID of the user role',
  })
  @IsInt()
  roleId!: number;
}