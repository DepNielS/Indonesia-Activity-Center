import {
  ApiProperty,
  ApiPropertyOptional,
} from '@nestjs/swagger';

import { PageStatus } from './create-page.dto';

export class PageResponseDto {
  @ApiProperty({
    example: 1,
    description: 'Unique page ID',
  })
  id!: number;

  @ApiProperty({
    example: 'About Indonesia Activity Center',
    description: 'Page title',
  })
  title!: string;

  @ApiProperty({
    example: 'about-indonesia-activity-center',
    description: 'Unique URL-friendly page slug',
  })
  slug!: string;

  @ApiPropertyOptional({
    example:
      'Learn more about Indonesia Activity Center.',
    description: 'Short page excerpt',
  })
  excerpt!: string | null;

  @ApiProperty({
    example:
      'Indonesia Activity Center is a destination...',
    description: 'Full page content',
  })
  content!: string;

  @ApiPropertyOptional({
    example:
      'https://example.com/images/about.jpg',
    description: 'Page image URL',
  })
  image!: string | null;

  @ApiProperty({
    enum: PageStatus,
    example: PageStatus.DRAFT,
    description: 'Current page status',
  })
  status!: PageStatus;

  @ApiProperty({
    example: '2026-08-28T08:00:00.000Z',
    description: 'Page creation timestamp',
  })
  createdAt!: Date;

  @ApiProperty({
    example: '2026-08-28T08:00:00.000Z',
    description: 'Last page update timestamp',
  })
  updatedAt!: Date;
}