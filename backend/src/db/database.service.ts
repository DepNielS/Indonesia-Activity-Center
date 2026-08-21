import { Injectable } from '@nestjs/common';

import { sql } from 'drizzle-orm';

import { db } from './index';

@Injectable()
export class DatabaseService {
  async checkConnection(): Promise<boolean> {
    try {
      await db.execute(sql`SELECT 1`);

      return true;
    } catch (error) {
      console.error('Database connection failed:', error);

      return false;
    }
  }
}