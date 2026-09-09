import { Test, TestingModule } from '@nestjs/testing';

import { AppController } from './app.controller';
import { DatabaseService } from './db/database.service';

describe('AppController', () => {
  let appController: AppController;

  const databaseServiceMock = {
    checkConnection: jest.fn(),
  };

  beforeEach(async () => {
    const app: TestingModule =
      await Test.createTestingModule({
        controllers: [AppController],
        providers: [
          {
            provide: DatabaseService,
            useValue: databaseServiceMock,
          },
        ],
      }).compile();

    appController =
      app.get<AppController>(AppController);
  });

  describe('getStatus', () => {
    it('should return running status when database is connected', async () => {
      databaseServiceMock.checkConnection.mockResolvedValue(
        true,
      );

      await expect(
        appController.getStatus(),
      ).resolves.toEqual({
        name: 'Indonesia Activity Center API',
        status: 'running',
        database: 'connected',
      });
    });

    it('should return disconnected status when database is unavailable', async () => {
      databaseServiceMock.checkConnection.mockResolvedValue(
        false,
      );

      await expect(
        appController.getStatus(),
      ).resolves.toEqual({
        name: 'Indonesia Activity Center API',
        status: 'running',
        database: 'disconnected',
      });
    });
  });
});