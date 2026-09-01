import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
  MaxLength,
  Matches,
} from 'class-validator';

import {
  ApiProperty,
  ApiPropertyOptional,
} from '@nestjs/swagger';

export enum ActivityStatus {
  DRAFT = 'DRAFT',
  PUBLISHED = 'PUBLISHED',
}

export class CreateActivityDto {
  @ApiProperty({
    example: 'Ayurvedic Massage',
    description: 'Activity name',
    maxLength: 150,
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(150)
  name!: string;

  @ApiProperty({
    example: 'ayurvedic-massage',
    description: 'Unique URL-friendly activity slug',
    maxLength: 180,
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(180)
  @Matches(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, {
  message:
    'slug must contain only lowercase letters, numbers, and single hyphens',
  })
  slug!: string;

  @ApiProperty({
    example:
      'A traditional Ayurvedic massage experience designed for relaxation and wellness.',
    description: 'Activity description',
  })
  @IsString()
  @IsNotEmpty()
  description!: string;

  @ApiPropertyOptional({
    example:
      'https://example.com/images/ayurvedic-massage.jpg',
    description: 'Activity image URL',
    maxLength: 500,
  })
  @IsOptional()
  @IsUrl()
  @MaxLength(500)
  image?: string;

  @ApiPropertyOptional({
    example: 'Wellness Center',
    description: 'Activity location',
    maxLength: 200,
  })
  @IsOptional()
  @IsString()
  @MaxLength(200)
  location?: string;

  @ApiPropertyOptional({
    example: '60 minutes',
    description: 'Activity duration',
    maxLength: 100,
  })
  @IsOptional()
  @IsString()
  @MaxLength(100)
  duration?: string;

}