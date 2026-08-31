import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

import { EventStatus } from './create-event.dto';

export class EventResponseDto {
  @ApiProperty({
    example: 1,
    description: 'Unique event ID',
  })
  id!: number;

  @ApiProperty({
    example: 'Yoga & Wellness Retreat 2026',
    description: 'Event title',
  })
  title!: string;

  @ApiProperty({
    example: 'yoga-wellness-retreat-2026',
    description: 'Unique URL-friendly event slug',
  })
  slug!: string;

  @ApiProperty({
    example:
      'A wellness retreat combining yoga, meditation, and Ayurvedic activities.',
    description: 'Event description',
  })
  description!: string;

  @ApiPropertyOptional({
    example:
      'https://example.com/images/yoga-retreat.jpg',
    description: 'Event image URL',
  })
  image!: string | null;

  @ApiProperty({
    example: '2026-09-15T09:00:00.000Z',
    description: 'Event start date and time',
  })
  startAt!: Date;

  @ApiProperty({
    example: '2026-09-15T17:00:00.000Z',
    description: 'Event end date and time',
  })
  endAt!: Date;

  @ApiPropertyOptional({
    example: 'Indonesia Activity Center',
    description: 'Event location',
  })
  location!: string | null;

  @ApiProperty({
    enum: EventStatus,
    example: EventStatus.DRAFT,
    description: 'Current event status',
  })
  status!: EventStatus;

  @ApiProperty({
    example: '2026-08-28T08:00:00.000Z',
    description: 'Event creation timestamp',
  })
  createdAt!: Date;

  @ApiProperty({
    example: '2026-08-28T08:00:00.000Z',
    description: 'Last event update timestamp',
  })
  updatedAt!: Date;
}