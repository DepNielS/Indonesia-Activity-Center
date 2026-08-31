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
  UseGuards,
} from '@nestjs/common';

import { ApiBearerAuth, ApiConflictResponse, ApiCreatedResponse, ApiForbiddenResponse, ApiNotFoundResponse,  ApiOkResponse, ApiOperation, ApiTags, ApiUnauthorizedResponse, } from '@nestjs/swagger';

import { PagesService } from './pages.service';

import { CreatePageDto } from './dto/create-page.dto';
import { UpdatePageDto } from './dto/update-page.dto';
import { PageResponseDto } from './dto/page-response.dto';

import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';

import { Roles } from '../auth/decorators/roles.decorator';


@ApiTags('Pages')
@Controller('pages')
export class PagesController {
  constructor(
    private readonly pagesService: PagesService,
  ) {}

  // ==========================================
  // PUBLIC
  // ==========================================

  @Get('published')
  @ApiOperation({
    summary: 'Get published pages',
    description:
      'Return all publicly available published pages.',
  })
  @ApiOkResponse({
    description: 'List of published pages',
    type: PageResponseDto,
    isArray: true,
  })
  async findPublished() {
    return this.pagesService.findPublished();
  }

  @Get('published/:slug')
  @ApiOperation({
    summary: 'Get published page by slug',
    description:
      'Return a single published page using its unique slug.',
  })
  @ApiOkResponse({
    description: 'Published page found',
    type: PageResponseDto,
  })
  @ApiNotFoundResponse({
  description: 'Published page not found',
  })
  async findPublishedBySlug(
    @Param('slug') slug: string,
  ) {
    return this.pagesService.findPublishedBySlug(
      slug,
    );
  }

  // ==========================================
  // PROTECTED
  // ==========================================
  
  @Get()
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Get all pages',
    description:
      'Return all pages including draft and published pages.',
  })
  @ApiOkResponse({
    description: 'List of pages',
    type: PageResponseDto,
    isArray: true,
  })
  @ApiUnauthorizedResponse({
  description:
    'Missing or invalid authentication token',
  })
  @UseGuards(JwtAuthGuard)
  async findAll() {
    return this.pagesService.findAll();
  }

  
  @Get(':id')
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Get page by ID',
    description:
      'Return a single page by its ID.',
  })
  @ApiOkResponse({
    description: 'Page found',
    type: PageResponseDto,
  })
  @ApiUnauthorizedResponse({
  description:
    'Missing or invalid authentication token',
  })
  @ApiNotFoundResponse({
    description: 'Page not found',
  })
  @UseGuards(JwtAuthGuard)
  async findById(
    @Param('id', ParseIntPipe)
    id: number,
  ) {
    return this.pagesService.findById(id);
  }

  // ==========================================
  // CREATE
  // ==========================================
  @Post()
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Create page',
    description:
      'Create a new page. Requires SUPER_ADMIN, ADMIN, or EDITOR role.',
  })
  @ApiCreatedResponse({
    description: 'Page successfully created',
    type: PageResponseDto,
  })
  @ApiUnauthorizedResponse({
  description:
      'Missing or invalid authentication token',
  })
  @ApiForbiddenResponse({
    description:
      'User does not have permission to create pages',
  })
  @ApiConflictResponse({
    description:
      'Page slug is already registered',
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
    @Body() dto: CreatePageDto,
  ) {
    return this.pagesService.createPage(
      dto,
    );
  }

  // ==========================================
  // UPDATE
  // ==========================================
  @Patch(':id')
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Update page',
    description:
      'Update an existing page. Requires SUPER_ADMIN, ADMIN, or EDITOR role.',
  })
  @ApiOkResponse({
    description: 'Page successfully updated',
    type: PageResponseDto,
  })
  @ApiUnauthorizedResponse({
  description:
      'Missing or invalid authentication token',
  })
  @ApiForbiddenResponse({
    description:
      'User does not have permission to update pages',
  })
  @ApiNotFoundResponse({
    description: 'Page not found',
  })
  @ApiConflictResponse({
    description:
      'Page slug is already registered',
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

    @Body() dto: UpdatePageDto,
  ) {
    return this.pagesService.updatePage(
      id,
      dto,
    );
  }

  // ==========================================
  // PUBLISH
  // ==========================================
  @Post(':id/publish')
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Publish page',
    description:
      'Publish a page. Requires SUPER_ADMIN or ADMIN role.',
  })
  @ApiOkResponse({
    description: 'Page successfully published',
    type: PageResponseDto,
  })
  @ApiUnauthorizedResponse({
    description:
      'Missing or invalid authentication token',
  })
  @ApiForbiddenResponse({
    description:
      'User does not have permission to publish pages',
  })
  @ApiNotFoundResponse({
    description: 'Page not found',
  })
  @ApiConflictResponse({
    description:
      'Page is already published',
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
    return this.pagesService.publishPage(
      id,
    );
  }

  // ==========================================
  // UNPUBLISH
  // ==========================================
  @Post(':id/unpublish')
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Unpublish page',
    description:
      'Return a published page to draft status. Requires SUPER_ADMIN or ADMIN role.',
  })
  @ApiOkResponse({
    description: 'Page successfully unpublished',
    type: PageResponseDto,
  })
  @ApiUnauthorizedResponse({
    description:
      'Missing or invalid authentication token',
  })
  @ApiForbiddenResponse({
    description:
      'User does not have permission to unpublish pages',
  })
  @ApiNotFoundResponse({
    description: 'Page not found',
  })
  @ApiConflictResponse({
    description:
      'Only published pages can be unpublished',
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
    return this.pagesService.unpublishPage(
      id,
    );
  }
}