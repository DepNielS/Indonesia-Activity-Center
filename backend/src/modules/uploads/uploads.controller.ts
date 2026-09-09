import {
  Controller,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';

import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

import {
  FileInterceptor,
} from '@nestjs/platform-express';

import { UploadsService } from './uploads.service';

import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';

@ApiTags('Uploads')
@Controller('uploads')
export class UploadsController {
  constructor(
    private readonly uploadsService: UploadsService,
  ) {}

  @Post('image')
  @ApiBearerAuth('access-token')
  @ApiOperation({
    summary: 'Upload image',
    description:
      'Upload an image to Supabase Storage. Requires SUPER_ADMIN, ADMIN, or EDITOR role.',
  })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
      required: ['file'],
    },
  })
  @ApiCreatedResponse({
    description:
      'Image successfully uploaded',
  })
  @ApiUnauthorizedResponse({
    description:
      'Missing or invalid authentication token',
  })
  @ApiForbiddenResponse({
    description:
      'User does not have permission to upload images',
  })
  @UseGuards(
    JwtAuthGuard,
    RolesGuard,
  )
  @Roles(
    'SUPER_ADMIN',
    'ADMIN',
    'EDITOR',
  )
  @UseInterceptors(
    FileInterceptor('file'),
  )
  async uploadImage(
    @UploadedFile() file: {
      buffer: Buffer;
      mimetype: string;
      size: number;
    },
  ) {
    return this.uploadsService.uploadImage(
      file,
    );
  }
}