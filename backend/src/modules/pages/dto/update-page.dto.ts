import {
  IsEnum,
  IsOptional,
  IsString,
  IsUrl,
  MaxLength,
} from 'class-validator';

import {
  ApiPropertyOptional,
} from '@nestjs/swagger';

import { PageStatus } from './create-page.dto';

export class UpdatePageDto {
  @ApiPropertyOptional({
    example: 'About Indonesia Activity Center 2026',
    description: 'Updated page title',
    maxLength: 150,
  })
  @IsOptional()
  @IsString()
  @MaxLength(150)
  title?: string;

  @ApiPropertyOptional({
    example: 'about-indonesia-activity-center-2026',
    description: 'Updated unique URL-friendly page slug',
    maxLength: 180,
  })
  @IsOptional()
  @IsString()
  @MaxLength(180)
  slug?: string;

  @ApiPropertyOptional({
    example:
      'Updated short summary of Indonesia Activity Center.',
    description: 'Updated page summary',
    maxLength: 300,
  })
  @IsOptional()
  @IsString()
  @MaxLength(300)
  excerpt?: string;

  @ApiPropertyOptional({
    example:
      'Updated page content for Indonesia Activity Center.',
    description: 'Updated main page content',
  })
  @IsOptional()
  @IsString()
  content?: string;

  @ApiPropertyOptional({
    example:
      'https://example.com/images/about-2026.jpg',
    description: 'Updated page image URL',
    maxLength: 500,
  })
  @IsOptional()
  @IsUrl()
  @MaxLength(500)
  image?: string;

  @ApiPropertyOptional({
    enum: PageStatus,
    example: PageStatus.DRAFT,
    description: 'Updated page status',
  })
  @IsOptional()
  @IsEnum(PageStatus)
  status?: PageStatus;
}