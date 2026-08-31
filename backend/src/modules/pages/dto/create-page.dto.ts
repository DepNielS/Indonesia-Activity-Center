import {
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

export enum PageStatus {
  DRAFT = 'DRAFT',
  PUBLISHED = 'PUBLISHED',
}

export class CreatePageDto {
  @ApiProperty({
    example: 'About Indonesia Activity Center',
    description: 'Page title',
    maxLength: 150,
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(150)
  title!: string;

  @ApiProperty({
    example: 'about-indonesia-activity-center',
    description: 'Unique URL-friendly page slug',
    maxLength: 180,
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(180)
  slug!: string;

  @ApiPropertyOptional({
    example:
      'Learn more about Indonesia Activity Center and our services.',
    description: 'Short page summary',
    maxLength: 300,
  })
  @IsOptional()
  @IsString()
  @MaxLength(300)
  excerpt?: string;

  @ApiProperty({
    example:
      'Indonesia Activity Center is a destination for wellness, sports, dining, and activities.',
    description: 'Main page content',
  })
  @IsString()
  @IsNotEmpty()
  content!: string;

  @ApiPropertyOptional({
    example:
      'https://example.com/images/about.jpg',
    description: 'Page image URL',
    maxLength: 500,
  })
  @IsOptional()
  @IsUrl()
  @MaxLength(500)
  image?: string;

  @ApiPropertyOptional({
    enum: PageStatus,
    example: PageStatus.DRAFT,
    description: 'Initial page publication status',
  })
  @IsOptional()
  @IsEnum(PageStatus)
  status?: PageStatus;
}