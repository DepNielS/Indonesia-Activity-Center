import { Controller, Get } from '@nestjs/common';

@Controller()
export class UsersController {

  @Get()
  getStatus() {
    return {
      message: 'Indonesia Activity Center API is running',
      status: 'success',
    };
  }

}