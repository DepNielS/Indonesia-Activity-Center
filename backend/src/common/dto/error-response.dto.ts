import { ApiProperty } from '@nestjs/swagger';

export class ErrorResponseDto {
  @ApiProperty({
    example: 400,
    description: 'HTTP status code',
  })
  statusCode!: number;

  @ApiProperty({
    example: 'Validation failed',
    description: 'Error message',
  })
  message!: string | string[];

  @ApiProperty({
    example: 'Bad Request',
    description: 'HTTP error description',
  })
  error!: string;

  @ApiProperty({
    example: '2026-08-31T05:00:00.000Z',
    description: 'Time when the error occurred',
  })
  timestamp?: string;

  @ApiProperty({
    example: '/api/v1/users',
    description: 'Request path',
  })
  path?: string;
}