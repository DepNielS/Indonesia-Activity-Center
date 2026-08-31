import { ApiProperty } from '@nestjs/swagger';

export class AuthenticatedUserDto {
  @ApiProperty({
    example: 1,
    description: 'Authenticated user ID',
  })
  id!: number;

  @ApiProperty({
    example: 'admin@example.com',
    description: 'Authenticated user email',
  })
  email!: string;

  @ApiProperty({
    example: 1,
    description: 'Authenticated user role ID',
  })
  roleId!: number;
}