import { seedActivities } from './seed/activities.seed';
import { pool } from '../db';

async function main() {
  console.log(
    'Starting database seeding...',
  );

  await seedActivities();

  console.log(
    'Database seeding completed.',
  );
}

main()
  .catch((error) => {
    console.error(
      'Database seeding failed:',
      error,
    );

    process.exitCode = 1;
  })
  .finally(async () => {
    await pool.end();
  });