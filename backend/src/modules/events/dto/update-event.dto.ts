import {
  IsDateString,
  IsOptional,
  IsString,
  IsUrl,
  MaxLength,
} from 'class-validator';

import {
  ApiPropertyOptional,
} from '@nestjs/swagger';

export class UpdateEventDto {
  @ApiPropertyOptional({
    example: 'Yoga & Wellness Retreat 2026',
    description: 'Updated event title',
    maxLength: 150,
  })
  @IsOptional()
  @IsString()
  @MaxLength(150)
  title?: string;

  @ApiPropertyOptional({
    example: 'yoga-wellness-retreat-2026',
    description: 'Updated unique URL-friendly event slug',
    maxLength: 180,
  })
  @IsOptional()
  @IsString()
  @MaxLength(180)
  slug?: string;

  @ApiPropertyOptional({
    example:
      'An updated description for the wellness retreat event.',
    description: 'Updated event description',
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional({
    example: 'https://example.com/images/yoga-retreat-2026.jpg',
    description: 'Updated event image URL',
    maxLength: 500,
  })
  @IsOptional()
  @IsUrl()
  @MaxLength(500)
  image?: string;

  @ApiPropertyOptional({
    example: '2026-09-15T09:00:00.000Z',
    description:
      'Updated event start date and time in ISO 8601 format',
  })
  @IsOptional()
  @IsDateString()
  startAt?: string;

  @ApiPropertyOptional({
    example: '2026-09-15T17:00:00.000Z',
    description:
      'Updated event end date and time in ISO 8601 format',
  })
  @IsOptional()
  @IsDateString()
  endAt?: string;

  @ApiPropertyOptional({
    example: 'Indonesia Activity Center',
    description: 'Updated event location',
    maxLength: 200,
  })
  @IsOptional()
  @IsString()
  @MaxLength(200)
  location?: string;
}