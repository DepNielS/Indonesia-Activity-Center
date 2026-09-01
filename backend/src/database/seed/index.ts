import { seedRoles } from './roles.seed';
import { seedEvents } from './events.seed';
import { seedPages } from './pages.seed';
import { seedActivities } from './activities.seed';

async function seed() {

  console.log('================================');
  console.log('Starting database seed...');
  console.log('================================');

  await seedRoles();

  await seedEvents();

  await seedPages();

  await seedActivities();

  console.log('================================');
  console.log('Database seed completed.');
  console.log('================================');
}

seed()
  .catch((error) => {
    console.error(
      'Database seed failed:',
      error,
    );

    process.exit(1);
  })
  .finally(() => {
    process.exit(0);
  });