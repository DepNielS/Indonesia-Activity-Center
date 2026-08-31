import {
  IsEmail,
  IsNotEmpty,
  IsString,
} from 'class-validator';

import {
  ApiProperty,
} from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({
    example: 'admin@example.com',
    description: 'User email address',
  })
  @IsEmail()
  email!: string;

  @ApiProperty({
    example: 'password123',
    description: 'User password',
  })
  @IsString()
  @IsNotEmpty()
  password!: string;
}