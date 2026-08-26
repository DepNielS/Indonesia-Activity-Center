import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

import { Reflector } from '@nestjs/core';

import {
  ROLES_KEY,
} from '../decorators/roles.decorator';

import {
  RolesService,
} from '../services/roles.service';

import type { Request } from 'express';

import type {
  AuthenticatedUser,
} from '../types/authenticated-user.interface';

@Injectable()
export class RolesGuard
  implements CanActivate
{
  constructor(
    private readonly reflector: Reflector,

    private readonly rolesService: RolesService,
  ) {}

  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {
    const requiredRoles =
      this.reflector.get<string[]>(
        ROLES_KEY,
        context.getHandler(),
      );

    if (
      !requiredRoles ||
      requiredRoles.length === 0
    ) {
      return true;
    }

    const request =
      context
        .switchToHttp()
        .getRequest<Request>();

    const user =
      request.user as AuthenticatedUser | undefined;

    if (!user) {
      throw new UnauthorizedException();
    }

    const role =
      await this.rolesService.findById(
        user.roleId,
      );

    if (!role) {
      throw new ForbiddenException(
        'User role not found',
      );
    }

    if (
      !requiredRoles.includes(
        role.name,
      )
    ) {
      throw new ForbiddenException(
        'You do not have permission to access this resource',
      );
    }

    return true;
  }
}