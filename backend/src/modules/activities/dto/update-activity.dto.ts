
import {
  IsInt,
  IsOptional,
  IsString,
  IsUrl,
  MaxLength,
  Matches,
} from 'class-validator';

import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateActivityDto {

  @ApiPropertyOptional({
    example: 'Ayurvedic Massage Experience',
    description: 'Updated activity name',
    maxLength: 150,
  })
  @IsOptional()
  @IsString()
  @MaxLength(150)
  name?: string;


  @ApiPropertyOptional({
    example: 'ayurvedic-massage-experience',
    description: 'Updated unique URL-friendly activity slug',
    maxLength: 180,
  })
  @IsOptional()
  @IsString()
  @MaxLength(180)
  @Matches(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, {
    message:
      'slug must contain only lowercase letters, numbers, and single hyphens',
  })
  slug?: string;


  @ApiPropertyOptional({
    example:
      'An enhanced Ayurvedic massage experience designed for relaxation and wellness.',
    description: 'Updated activity description',
  })
  @IsOptional()
  @IsString()
  description?: string;


  @ApiPropertyOptional({
    example:
      'https://example.com/images/ayurvedic-massage-new.jpg',
    description: 'Updated activity image URL',
    maxLength: 500,
  })
  @IsOptional()
  @IsUrl()
  @MaxLength(500)
  image?: string;


  @ApiPropertyOptional({
    example: 'Wellness Center',
    description: 'Updated activity location',
    maxLength: 200,
  })
  @IsOptional()
  @IsString()
  @MaxLength(200)
  location?: string;


  @ApiPropertyOptional({
    example: '90 minutes',
    description: 'Updated activity duration',
    maxLength: 100,
  })
  @IsOptional()
  @IsString()
  @MaxLength(100)
  duration?: string;


  @ApiPropertyOptional({
    example: 3,
    description: 'Updated activity category ID',
  })
  @IsOptional()
  @IsInt()
  categoryId?: number;
}

