import { Injectable } from '@nestjs/common';
import { eq } from 'drizzle-orm';

import { db } from '../../../db';
import { roles } from '../../../database/schema/roles.schema';

@Injectable()
export class RolesService {
  async findById(roleId: number) {
    const result = await db
      .select()
      .from(roles)
      .where(eq(roles.id, roleId))
      .limit(1);

    return result[0] ?? null;
  }
}