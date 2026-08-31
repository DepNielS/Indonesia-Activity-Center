import {
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
  MaxLength,
} from 'class-validator';

import {
  ApiProperty,
  ApiPropertyOptional,
} from '@nestjs/swagger';

export enum EventStatus {
  DRAFT = 'DRAFT',
  PUBLISHED = 'PUBLISHED',
  CANCELLED = 'CANCELLED',
}

export class CreateEventDto {
  @ApiProperty({
    example: 'Yoga & Wellness Retreat',
    description: 'Event title',
    maxLength: 150,
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(150)
  title!: string;

  @ApiProperty({
    example: 'yoga-wellness-retreat',
    description: 'Unique URL-friendly event slug',
    maxLength: 180,
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(180)
  slug!: string;

  @ApiProperty({
    example:
      'A wellness retreat combining yoga, meditation, and holistic activities.',
    description: 'Event description',
  })
  @IsString()
  @IsNotEmpty()
  description!: string;

  @ApiPropertyOptional({
    example: 'https://example.com/images/yoga-retreat.jpg',
    description: 'Event image URL',
    maxLength: 500,
  })
  @IsOptional()
  @IsUrl()
  @MaxLength(500)
  image?: string;

  @ApiProperty({
    example: '2026-09-15T09:00:00.000Z',
    description: 'Event start date and time in ISO 8601 format',
  })
  @IsDateString()
  startAt!: string;

  @ApiProperty({
    example: '2026-09-15T17:00:00.000Z',
    description: 'Event end date and time in ISO 8601 format',
  })
  @IsDateString()
  endAt!: string;

  @ApiPropertyOptional({
    example: 'Indonesia Activity Center',
    description: 'Event location',
    maxLength: 200,
  })
  @IsOptional()
  @IsString()
  @MaxLength(200)
  location?: string;

  @ApiPropertyOptional({
    enum: EventStatus,
    example: EventStatus.DRAFT,
    description: 'Initial event status',
  })
  @IsOptional()
  @IsEnum(EventStatus)
  status?: EventStatus;
}