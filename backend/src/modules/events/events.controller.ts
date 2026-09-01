import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';

import { ApiBearerAuth, ApiConflictResponse, ApiCreatedResponse, ApiForbiddenResponse, ApiNotFoundResponse,  ApiOkResponse, ApiOperation, ApiTags, ApiUnauthorizedResponse, } from '@nestjs/swagger';

import { EventsService } from './events.service';

import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { EventResponseDto } from './dto/event-response.dto';

import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';

import { Roles } from '../auth/decorators/roles.decorator';
import { QueryEventsDto } from './dto/query-events.dto';


@ApiTags('Events')
@Controller('events')
export class EventsController {
  constructor(
    private readonly eventsService: EventsService,
  ) {}
  
  @Post()
  @ApiBearerAuth('access-token')
  @ApiOperation({
    summary: 'Create event',
    description:
      'Create a new event. Requires SUPER_ADMIN, ADMIN, or EDITOR role.',
  })
  @ApiCreatedResponse({
    description: 'Event successfully created',
    type: EventResponseDto,
  })
  @ApiForbiddenResponse({
  description: 'User does not have permission to create events',
  })
  @ApiConflictResponse({
    description: 'Event slug is already registered',
  })
  @ApiUnauthorizedResponse({
  description:
    'Missing or invalid authentication token',
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
  async create(
    @Body() dto: CreateEventDto,
  ) {
    return this.eventsService.createEvent(
      dto,
    );
  }

    @Get('published')
    @ApiOperation({
      summary: 'Get published events',
      description:
        'Return all publicly available published events.',
    })
    @ApiOkResponse({
      description: 'List of published events',
      type: EventResponseDto,
      isArray: true,
    })

    async findPublished() {
    return this.eventsService.findPublished();
    }

    @Get('published/:slug')
   @ApiOperation({
      summary: 'Get published event by slug',
      description:
        'Return a published event using its slug.',
    })
    @ApiOkResponse({
      description: 'Published event successfully retrieved',
      type: EventResponseDto,
    })
    @ApiNotFoundResponse({
      description: 'Published event not found',
    })
    async findPublishedBySlug(
    @Param('slug') slug: string,
    ) {
    return this.eventsService.findPublishedBySlug(
        slug,
    );
    }

    
    @Get()
    @ApiBearerAuth('access-token')
    @ApiOperation({
        summary: 'Get all events',
        description:
          'Return all events. Results can optionally be filtered by status.',
    })
    @ApiOkResponse({
      description: 'List of events',
      type: EventResponseDto,
      isArray: true,
    })
    @ApiUnauthorizedResponse({
      description: 'Missing or invalid authentication token',
    })
    @UseGuards(JwtAuthGuard)
    async findAll(
      @Query() query: QueryEventsDto,
    ) {
      return this.eventsService.findAll(
        query,
      );
    }

    @Get(':id')
    @ApiBearerAuth('access-token')
    @ApiOperation({
      summary: 'Get event by ID',
      description: 'Return a single event by its ID.',
    })
    @ApiOkResponse({
      description: 'Event found',
      type: EventResponseDto,
    })
    @ApiUnauthorizedResponse({
      description: 'Missing or invalid authentication token',
    })
    @ApiNotFoundResponse({
      description: 'Event not found',
    })
    @UseGuards(JwtAuthGuard)
    async findById(
    @Param('id', ParseIntPipe)
    id: number,
    ) {
    return this.eventsService.findById(id);
    }


  
  @Patch(':id')
  @ApiBearerAuth('access-token')
  @ApiOperation({
    summary: 'Update event',
    description:
      'Update an existing event. Requires SUPER_ADMIN, ADMIN, or EDITOR role.',
  })
  @ApiOkResponse({
    description: 'Event successfully updated',
    type: EventResponseDto,
  })
  @ApiUnauthorizedResponse({
  description: 'Missing or invalid authentication token',
})
@ApiForbiddenResponse({
  description: 'User does not have permission to update events',
})
@ApiNotFoundResponse({
  description: 'Event not found',
})
@ApiConflictResponse({
  description: 'Event slug is already registered',
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
  @ApiBearerAuth('access-token')
  @ApiOperation({
    summary: 'Publish event',
    description:
      'Publish an event. Requires SUPER_ADMIN or ADMIN role.',
  })
  @ApiOkResponse({
    description: 'Event successfully published',
    type: EventResponseDto,
  })
  @ApiUnauthorizedResponse({
  description: 'Missing or invalid authentication token',
  })
  @ApiForbiddenResponse({
    description:
      'User does not have permission to publish events',
  })
  @ApiNotFoundResponse({
    description: 'Event not found',
  })
  @ApiConflictResponse({
    description:
      'Event is already published or cannot be published',
  })
  @HttpCode(HttpStatus.OK)
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
    @ApiBearerAuth('access-token')
    @ApiOperation({
      summary: 'Unpublish event',
      description:
        'Return a published event to draft status. Requires SUPER_ADMIN or ADMIN role.',
    })
    @ApiOkResponse({
      description: 'Event successfully unpublished',
      type: EventResponseDto,
    })
    @ApiUnauthorizedResponse({
  description: 'Missing or invalid authentication token',
  })
  @ApiForbiddenResponse({
    description:
      'User does not have permission to unpublish events',
  })
  @ApiNotFoundResponse({
    description: 'Event not found',
  })
  @ApiConflictResponse({
    description:
      'Only published events can be unpublished',
  })
    @HttpCode(HttpStatus.OK)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('SUPER_ADMIN', 'ADMIN')
    async unpublish(
    @Param('id', ParseIntPipe)
    id: number,
    ) {
    return this.eventsService.unpublishEvent(id);
    }

  
    @Post(':id/cancel')
    @ApiBearerAuth('access-token')
    @ApiOperation({
    summary: 'Cancel event',
    description:
      'Cancel an event. Requires SUPER_ADMIN or ADMIN role.',
    })
    @ApiOkResponse({
      description: 'Event successfully cancelled',
      type: EventResponseDto,
    })
    @ApiUnauthorizedResponse({
      description: 'Missing or invalid authentication token',
    })
    @ApiForbiddenResponse({
      description:
        'User does not have permission to cancel events',
    })
    @ApiNotFoundResponse({
      description: 'Event not found',
    })
    @ApiConflictResponse({
      description:
        'Event cannot be cancelled in its current state',
    })
    @HttpCode(HttpStatus.OK)
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