import { db } from '../../db/index';
import { roles } from '../schema';

const roleData = [
  {
    name: 'SUPER_ADMIN',
  },
  {
    name: 'ADMIN',
  },
  {
    name: 'EDITOR',
  },
];

async function seedRoles() {
  console.log('Starting role seed...');

  for (const role of roleData) {
    await db
      .insert(roles)
      .values(role)
      .onConflictDoNothing();
  }

  console.log('Role seed completed.');
}

seedRoles()
  .catch((error) => {
    console.error('Role seed failed:', error);
    process.exit(1);
  })
  .finally(() => {
    process.exit(0);
  });