import { Controller, Get } from '@nestjs/common';

import { DatabaseService } from './db/database.service';

@Controller()
export class AppController {
  constructor(
    private readonly databaseService: DatabaseService,
  ) {}

  @Get()
  async getStatus() {
    const databaseConnected =
      await this.databaseService.checkConnection();

    return {
      name: 'Indonesia Activity Center API',
      status: 'running',
      database: databaseConnected ? 'connected' : 'disconnected',
    };
  }
}