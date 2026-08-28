import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';

import { EventsService } from './events.service';

import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';

import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';

import { Roles } from '../auth/decorators/roles.decorator';
import { QueryEventsDto } from './dto/query-events.dto';

@Controller('events')
export class EventsController {
  constructor(
    private readonly eventsService: EventsService,
  ) {}

  @Post()
  @UseGuards(
    JwtAuthGuard,
    RolesGuard,
  )
  @Roles(
    'SUPER_ADMIN',
    'ADMIN',
    'EDITOR',
  )
  async create(
    @Body() dto: CreateEventDto,
  ) {
    return this.eventsService.createEvent(
      dto,
    );
  }

    @Get('published')
    async findPublished() {
    return this.eventsService.findPublished();
    }

    @Get('published/:slug')
    async findPublishedBySlug(
    @Param('slug') slug: string,
    ) {
    return this.eventsService.findPublishedBySlug(
        slug,
    );
    }

    @Get()
    @UseGuards(JwtAuthGuard)
    async findAll(
      @Query() query: QueryEventsDto,
    ) {
      return this.eventsService.findAll(
        query,
      );
    }

    @Get(':id')
    @UseGuards(JwtAuthGuard)
    async findById(
    @Param('id', ParseIntPipe)
    id: number,
    ) {
    return this.eventsService.findById(id);
    }



  @Patch(':id')
  @UseGuards(
    JwtAuthGuard,
    RolesGuard,
  )
  @Roles(
    'SUPER_ADMIN',
    'ADMIN',
    'EDITOR',
  )
  async update(
    @Param('id', ParseIntPipe)
    id: number,

    @Body() dto: UpdateEventDto,
  ) {
    return this.eventsService.updateEvent(
      id,
      dto,
    );
  }

  @Post(':id/publish')
  @UseGuards(
    JwtAuthGuard,
    RolesGuard,
  )
  @Roles(
    'SUPER_ADMIN',
    'ADMIN',
  )
  async publish(
    @Param('id', ParseIntPipe)
    id: number,
  ) {
    return this.eventsService.publishEvent(
      id,
    );
  }

    @Post(':id/unpublish')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('SUPER_ADMIN', 'ADMIN')
    async unpublish(
    @Param('id', ParseIntPipe)
    id: number,
    ) {
    return this.eventsService.unpublishEvent(id);
    }

  @Post(':id/cancel')
  @UseGuards(
    JwtAuthGuard,
    RolesGuard,
  )
  @Roles(
    'SUPER_ADMIN',
    'ADMIN',
  )
  async cancel(
    @Param('id', ParseIntPipe)
    id: number,
  ) {
    return this.eventsService.cancelEvent(
      id,
    );
  }
}