import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';

import {
  ApiBearerAuth,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

import { ActivitiesService } from './activities.service';

import { CreateActivityDto } from './dto/create-activity.dto';
import { UpdateActivityDto } from './dto/update-activity.dto';
import { ActivityResponseDto } from './dto/activity-response.dto';

import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';

@ApiTags('Activities')
@Controller('activities')
export class ActivitiesController {
  constructor(
    private readonly activitiesService: ActivitiesService,
  ) {}

  // ==========================================
  // PUBLIC
  // ==========================================

  @Get('published')
  @ApiOperation({
    summary: 'Get published activities',
    description:
      'Return all publicly available published activities.',
  })
  @ApiOkResponse({
    description: 'List of published activities',
    type: ActivityResponseDto,
    isArray: true,
  })
  async findPublished() {
    return this.activitiesService.findPublished();
  }

  @Get('published/:slug')
  @ApiOperation({
    summary: 'Get published activity by slug',
    description:
      'Return a single published activity using its unique slug.',
  })
  @ApiOkResponse({
    description: 'Published activity found',
    type: ActivityResponseDto,
  })
  @ApiNotFoundResponse({
    description: 'Published activity not found',
  })
  async findPublishedBySlug(
    @Param('slug') slug: string,
  ) {
    return this.activitiesService.findPublishedBySlug(
      slug,
    );
  }

  @Get('category/:slug')
  @ApiOperation({
    summary: 'Get published activities by category',
    description:
      'Return all published activities belonging to the specified category.',
  })
  @ApiOkResponse({
    description:
      'List of published activities in the category',
    type: ActivityResponseDto,
    isArray: true,
  })
  @ApiNotFoundResponse({
    description: 'Activity category not found',
  })
  async findPublishedByCategory(
    @Param('slug') slug: string,
  ) {
    return this.activitiesService.findPublishedByCategory(
      slug,
    );
  }

  // ==========================================
  // PROTECTED
  // ==========================================

  @Get()
  @ApiBearerAuth('access-token')
  @ApiOperation({
    summary: 'Get all activities',
    description:
      'Return all activities including draft and published activities.',
  })
  @ApiOkResponse({
    description: 'List of activities',
    type: ActivityResponseDto,
    isArray: true,
  })
  @ApiUnauthorizedResponse({
    description:
      'Missing or invalid authentication token',
  })
  @UseGuards(JwtAuthGuard)
  async findAll() {
    return this.activitiesService.findAll();
  }

  @Get(':id')
  @ApiBearerAuth('access-token')
  @ApiOperation({
    summary: 'Get activity by ID',
    description:
      'Return a single activity by its ID.',
  })
  @ApiOkResponse({
    description: 'Activity found',
    type: ActivityResponseDto,
  })
  @ApiUnauthorizedResponse({
    description:
      'Missing or invalid authentication token',
  })
  @ApiNotFoundResponse({
    description: 'Activity not found',
  })
  @UseGuards(JwtAuthGuard)
  async findById(
    @Param('id', ParseIntPipe)
    id: number,
  ) {
    return this.activitiesService.findById(id);
  }

  // ==========================================
  // CREATE
  // ==========================================

  @Post()
  @ApiBearerAuth('access-token')
  @ApiOperation({
    summary: 'Create activity',
    description:
      'Create a new activity. Requires SUPER_ADMIN, ADMIN, or EDITOR role.',
  })
  @ApiCreatedResponse({
    description: 'Activity successfully created',
    type: ActivityResponseDto,
  })
  @ApiUnauthorizedResponse({
    description:
      'Missing or invalid authentication token',
  })
  @ApiForbiddenResponse({
    description:
      'User does not have permission to create activities',
  })
  @ApiConflictResponse({
    description:
      'Activity slug is already registered',
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
    @Body() dto: CreateActivityDto,
  ) {
    return this.activitiesService.createActivity(
      dto,
    );
  }

  // ==========================================
  // UPDATE
  // ==========================================

  @Patch(':id')
  @ApiBearerAuth('access-token')
  @ApiOperation({
    summary: 'Update activity',
    description:
      'Update an existing activity. Requires SUPER_ADMIN, ADMIN, or EDITOR role.',
  })
  @ApiOkResponse({
    description:
      'Activity successfully updated',
    type: ActivityResponseDto,
  })
  @ApiUnauthorizedResponse({
    description:
      'Missing or invalid authentication token',
  })
  @ApiForbiddenResponse({
    description:
      'User does not have permission to update activities',
  })
  @ApiNotFoundResponse({
    description: 'Activity not found',
  })
  @ApiConflictResponse({
    description:
      'Activity slug is already registered',
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

    @Body() dto: UpdateActivityDto,
  ) {
    return this.activitiesService.updateActivity(
      id,
      dto,
    );
  }

  // ==========================================
  // PUBLISH
  // ==========================================

  @Post(':id/publish')
  @ApiBearerAuth('access-token')
  @ApiOperation({
    summary: 'Publish activity',
    description:
      'Publish an activity. Requires SUPER_ADMIN or ADMIN role.',
  })
  @ApiOkResponse({
    description:
      'Activity successfully published',
    type: ActivityResponseDto,
  })
  @ApiUnauthorizedResponse({
    description:
      'Missing or invalid authentication token',
  })
  @ApiForbiddenResponse({
    description:
      'User does not have permission to publish activities',
  })
  @ApiNotFoundResponse({
    description: 'Activity not found',
  })
  @ApiConflictResponse({
    description:
      'Activity is already published',
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
    return this.activitiesService.publishActivity(
      id,
    );
  }

  // ==========================================
  // UNPUBLISH
  // ==========================================

  @Post(':id/unpublish')
  @ApiBearerAuth('access-token')
  @ApiOperation({
    summary: 'Unpublish activity',
    description:
      'Return a published activity to draft status. Requires SUPER_ADMIN or ADMIN role.',
  })
  @ApiOkResponse({
    description:
      'Activity successfully unpublished',
    type: ActivityResponseDto,
  })
  @ApiUnauthorizedResponse({
    description:
      'Missing or invalid authentication token',
  })
  @ApiForbiddenResponse({
    description:
      'User does not have permission to unpublish activities',
  })
  @ApiNotFoundResponse({
    description: 'Activity not found',
  })
  @ApiConflictResponse({
    description:
      'Only published activities can be unpublished',
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
  async unpublish(
    @Param('id', ParseIntPipe)
    id: number,
  ) {
    return this.activitiesService.unpublishActivity(
      id,
    );
  }

  // ==========================================
  // DELETE
  // ==========================================

  @Delete(':id')
  @ApiBearerAuth('access-token')
  @ApiOperation({
    summary: 'Delete activity',
    description:
      'Delete an activity. Requires SUPER_ADMIN or ADMIN role.',
  })
  @ApiOkResponse({
    description:
      'Activity successfully deleted',
  })
  @ApiUnauthorizedResponse({
    description:
      'Missing or invalid authentication token',
  })
  @ApiForbiddenResponse({
    description:
      'User does not have permission to delete activities',
  })
  @ApiNotFoundResponse({
    description: 'Activity not found',
  })
  @UseGuards(
    JwtAuthGuard,
    RolesGuard,
  )
  @Roles(
    'SUPER_ADMIN',
    'ADMIN',
  )
  @HttpCode(HttpStatus.OK)
  async delete(
    @Param('id', ParseIntPipe)
    id: number,
  ) {
    return this.activitiesService.deleteActivity(
      id,
    );
  }
}