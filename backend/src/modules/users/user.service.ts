import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import * as argon2 from 'argon2';

import { eq } from 'drizzle-orm';

import { db } from '../../db';
import { roles, users } from '../../database/schema';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  async findByEmail(email: string) {
    const result = await db
      .select()
      .from(users)
      .where(eq(users.email, email))
      .limit(1);

    return result[0] ?? null;
  }

  async createUser(
  name: string,
  email: string,
  password: string,
  roleId: number,
) {
  const existingUser =
    await this.findByEmail(email);

  if (existingUser) {
    throw new ConflictException(
      'Email is already registered',
    );
  }

  const role =
    await this.findRoleById(roleId);

  if (!role) {
    throw new NotFoundException(
      'Role not found',
    );
  }

  const hashedPassword =
    await argon2.hash(password);

  const result = await db
    .insert(users)
    .values({
      name,
      email,
      password: hashedPassword,
      roleId,
    })
    .returning();

  const user = result[0];

  if (!user) {
    throw new Error(
      'Failed to create user',
    );
  }

  const {
    password: _password,
    ...safeUser
  } = user;

  return safeUser;
}
  //
async findById(id: number) {
  const result = await db
    .select({
      id: users.id,
      name: users.name,
      email: users.email,
      roleId: users.roleId,
      isActive: users.isActive,
      createdAt: users.createdAt,
      updatedAt: users.updatedAt,
    })
    .from(users)
    .where(eq(users.id, id))
    .limit(1);

  return result[0] ?? null;
}

    async findRoleById(roleId: number) {
    const result = await db
      .select()
      .from(roles)
      .where(eq(roles.id, roleId))
      .limit(1);

    return result[0] ?? null;
  }

async findAll() {
  const result = await db
    .select({
      id: users.id,
      name: users.name,
      email: users.email,
      roleId: users.roleId,
      isActive: users.isActive,
      createdAt: users.createdAt,
      updatedAt: users.updatedAt,
    })
    .from(users)
    .where(eq(users.isActive, true));

  return result;
}

  async updateUser(
  id: number,
  dto: UpdateUserDto,
) {
  const existingUser = await this.findById(id);

  if (!existingUser) {
    throw new NotFoundException(
      'User not found',
    );
  }

  if (dto.email) {
    const emailOwner =
      await this.findByEmail(dto.email);

    if (
      emailOwner &&
      emailOwner.id !== id
    ) {
      throw new ConflictException(
        'Email is already registered',
      );
    }
  }

  if (dto.roleId !== undefined) {
    const role =
      await this.findRoleById(dto.roleId);

    if (!role) {
      throw new NotFoundException(
        'Role not found',
      );
    }
  }

  const updateData: {
    name?: string;
    email?: string;
    password?: string;
    roleId?: number;
    updatedAt: Date;
  } = {
    updatedAt: new Date(),
  };

  if (dto.name !== undefined) {
    updateData.name = dto.name;
  }

  if (dto.email !== undefined) {
    updateData.email = dto.email;
  }

  if (dto.password !== undefined) {
    updateData.password =
      await argon2.hash(dto.password);
  }

  if (dto.roleId !== undefined) {
    updateData.roleId = dto.roleId;
  }

  const result = await db
    .update(users)
    .set(updateData)
    .where(eq(users.id, id))
    .returning({
      id: users.id,
      name: users.name,
      email: users.email,
      roleId: users.roleId,
      createdAt: users.createdAt,
      updatedAt: users.updatedAt,
    });

  return result[0];
}

async deactivateUser(id: number) {
  const existingUser =
    await this.findById(id);

  if (!existingUser) {
    throw new NotFoundException(
      'User not found',
    );
  }

  if (!existingUser.isActive) {
    throw new ConflictException(
      'User is already inactive',
    );
  }

  const result = await db
    .update(users)
    .set({
      isActive: false,
      updatedAt: new Date(),
    })
    .where(eq(users.id, id))
    .returning({
      id: users.id,
      name: users.name,
      email: users.email,
      roleId: users.roleId,
      isActive: users.isActive,
      updatedAt: users.updatedAt,
    });

  return result[0];
}
}