import {
  Injectable,
  ServiceUnavailableException,
} from '@nestjs/common';

import { DatabaseService } from '../../db/database.service';

@Injectable()
export class HealthService {
  constructor(
    private readonly databaseService: DatabaseService,
  ) {}

  async check() {
    const database =
      await this.databaseService.checkConnection();

    if (!database) {
      throw new ServiceUnavailableException(
        'Database connection is unavailable',
      );
    }

    return {
      status: 'ok',
      database: 'connected',
    };
  }
}