
import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export enum ActivityStatus {
  DRAFT = 'DRAFT',
  PUBLISHED = 'PUBLISHED',
}

export class CreateActivityDto {

  @ApiProperty({
    example: 'Ayurvedic Massage',
    description: 'Activity name',
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(150)
  name!: string;


  @ApiProperty({
    example: 'ayurvedic-massage',
    description: 'Unique activity slug',
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(180)
  slug!: string;


  @ApiProperty({
    example:
      'A traditional Ayurvedic massage experience designed for relaxation, wellness, and rejuvenation.',
    description: 'Activity description',
  })
  @IsString()
  @IsNotEmpty()
  description!: string;


  @ApiPropertyOptional({
    example:
      'https://example.com/images/ayurvedic-massage.jpg',
    description: 'Activity image URL',
  })
  @IsOptional()
  @IsString()
  @MaxLength(500)
  image?: string;


  @ApiPropertyOptional({
    example: 'Wellness Center',
    description: 'Activity location',
  })
  @IsOptional()
  @IsString()
  @MaxLength(200)
  location?: string;


  @ApiPropertyOptional({
    example: '60 minutes',
    description: 'Activity duration',
  })
  @IsOptional()
  @IsString()
  @MaxLength(100)
  duration?: string;


  @ApiProperty({
    example: 3,
    description: 'Activity category ID',
  })
  @IsInt()
  categoryId!: number;
}

