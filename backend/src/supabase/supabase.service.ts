import { Injectable } from '@nestjs/common';

import { ConfigService } from '@nestjs/config';

import {
  createClient,
  SupabaseClient,
} from '@supabase/supabase-js';

@Injectable()
export class SupabaseService {
  private readonly client: SupabaseClient;

  constructor(
    private readonly configService: ConfigService,
  ) {
    const supabaseUrl =
      this.configService.get<string>(
        'SUPABASE_URL',
      );

    const supabaseSecretKey =
      this.configService.get<string>(
        'SUPABASE_SECRET_KEY',
      );

    if (!supabaseUrl) {
      throw new Error(
        'SUPABASE_URL is not configured',
      );
    }

    if (!supabaseSecretKey) {
      throw new Error(
        'SUPABASE_SECRET_KEY is not configured',
      );
    }

    this.client = createClient(
      supabaseUrl,
      supabaseSecretKey,
    );
  }

  getClient(): SupabaseClient {
    return this.client;
  }
}