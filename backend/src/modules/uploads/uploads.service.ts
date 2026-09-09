import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';


interface UploadedImageFile {
  buffer: Buffer;
  mimetype: string;
  size: number;
}
import { SupabaseService } from '../../supabase/supabase.service';

@Injectable()
export class UploadsService {
  private readonly bucketName = 'iac-media';

  constructor(
    private readonly supabaseService: SupabaseService,
  ) {}

  async uploadImage(
    file: UploadedImageFile,
  ) {
    if (!file) {
      throw new BadRequestException(
        'Image file is required',
      );
    }

    const allowedMimeTypes = [
      'image/jpeg',
      'image/png',
      'image/webp',
    ];

    if (!allowedMimeTypes.includes(file.mimetype)) {
      throw new BadRequestException(
        'Only JPEG, PNG, and WebP images are allowed',
      );
    }

    const maxFileSize = 5 * 1024 * 1024;

    if (file.size > maxFileSize) {
      throw new BadRequestException(
        'Image size must not exceed 5 MB',
      );
    }

    const extensionMap: Record<string, string> = {
      'image/jpeg': 'jpg',
      'image/png': 'png',
      'image/webp': 'webp',
    };

    const extension =
      extensionMap[file.mimetype];

    const fileName = `${crypto.randomUUID()}.${extension}`;

    const filePath = `images/${fileName}`;

    const supabase =
      this.supabaseService.getClient();

    const { error } = await supabase.storage
      .from(this.bucketName)
      .upload(
        filePath,
        file.buffer,
        {
          contentType: file.mimetype,
          upsert: false,
        },
      );

    if (error) {
      throw new InternalServerErrorException(
        `Failed to upload image: ${error.message}`,
      );
    }

    const {
      data: publicUrlData,
    } = supabase.storage
      .from(this.bucketName)
      .getPublicUrl(filePath);

    return {
      path: filePath,
      publicUrl: publicUrlData.publicUrl,
    };
  }
}