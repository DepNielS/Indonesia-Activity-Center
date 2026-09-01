import {
  ApiProperty,
  ApiPropertyOptional,
} from '@nestjs/swagger';

import { ActivityStatus } from './create-activity.dto';

export class ActivityResponseDto {
  @ApiProperty({
    example: 1,
    description: 'Unique activity ID',
  })
  id!: number;

  @ApiProperty({
    example: 'Ayurvedic Massage',
    description: 'Activity name',
  })
  name!: string;

  @ApiProperty({
    example: 'ayurvedic-massage',
    description: 'Unique URL-friendly activity slug',
  })
  slug!: string;

  @ApiProperty({
    example:
      'A traditional Ayurvedic massage experience designed for relaxation and wellness.',
    description: 'Activity description',
  })
  description!: string;

  @ApiPropertyOptional({
    example:
      'https://example.com/images/ayurvedic-massage.jpg',
    description: 'Activity image URL',
  })
  image!: string | null;

  @ApiPropertyOptional({
    example: 'Wellness Center',
    description: 'Activity location',
  })
  location!: string | null;

  @ApiPropertyOptional({
    example: '60 minutes',
    description: 'Activity duration',
  })
  duration!: string | null;

  @ApiProperty({
    enum: ActivityStatus,
    example: ActivityStatus.DRAFT,
    description: 'Current activity publication status',
  })
  status!: ActivityStatus;

  @ApiProperty({
    example: '2026-09-01T08:00:00.000Z',
    description: 'Activity creation timestamp',
  })
  createdAt!: Date;

  @ApiProperty({
    example: '2026-09-01T08:30:00.000Z',
    description: 'Last activity update timestamp',
  })
  updatedAt!: Date;
}