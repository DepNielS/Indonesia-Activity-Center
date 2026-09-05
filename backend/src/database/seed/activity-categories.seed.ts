import { db } from '../../db';

import {
  activityCategories,
} from '../../database/schema';

export async function seedActivityCategories() {
  console.log(
    'Seeding activity categories...',
  );

  await db
    .insert(activityCategories)
    .values([
      {
        name: 'Padel',
        slug: 'padel',
      },
      {
        name: 'Local Food',
        slug: 'food',
      },
      {
        name: 'Wellness',
        slug: 'wellness',
      },
      {
        name: 'Events',
        slug: 'events',
      },
    ])
    .onConflictDoNothing({
      target: activityCategories.slug,
    });

  console.log(
    'Activity categories seeded successfully.',
  );
}