import {
  ApiProperty,
} from '@nestjs/swagger';

export class UserResponseDto {
  @ApiProperty({
    example: 1,
    description: 'Unique user ID',
  })
  id!: number;

  @ApiProperty({
    example: 'John Doe',
    description: 'User full name',
  })
  name!: string;

  @ApiProperty({
    example: 'john@example.com',
    description: 'User email address',
  })
  email!: string;

  @ApiProperty({
    example: 2,
    description: 'ID of the assigned role',
  })
  roleId!: number;

  @ApiProperty({
    example: true,
    description: 'Whether the user account is active',
  })
  isActive!: boolean;

  @ApiProperty({
    example: '2026-08-28T08:00:00.000Z',
    description: 'User creation timestamp',
  })
  createdAt!: Date;

  @ApiProperty({
    example: '2026-08-28T08:30:00.000Z',
    description: 'Last update timestamp',
  })
  updatedAt!: Date;
}