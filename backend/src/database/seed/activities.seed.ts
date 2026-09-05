
import { eq } from 'drizzle-orm';

import { db } from '../../db';

import {
  activities,
  activityCategories,
} from '../../database/schema';

import { ActivityStatus } from '../../modules/activities/dto/create-activity.dto';

export async function seedActivities() {
  console.log('Seeding activities...');

  // ============================================
  // GET ACTIVITY CATEGORIES
  // ============================================

  const categories =
    await db
      .select({
        id: activityCategories.id,
        slug: activityCategories.slug,
      })
      .from(activityCategories);


  // ============================================
  // FIND CATEGORY ID BY SLUG
  // ============================================

  const padelCategory =
    categories.find(
      (category) =>
        category.slug === 'padel',
    );

  const foodCategory =
    categories.find(
      (category) =>
        category.slug === 'food',
    );

  const wellnessCategory =
    categories.find(
      (category) =>
        category.slug === 'wellness',
    );

  const eventsCategory =
    categories.find(
      (category) =>
        category.slug === 'events',
    );


  // ============================================
  // VALIDATE REQUIRED CATEGORIES
  // ============================================

  if (!padelCategory) {
    throw new Error(
      'Activity category "padel" not found',
    );
  }

  if (!foodCategory) {
    throw new Error(
      'Activity category "food" not found',
    );
  }

  if (!wellnessCategory) {
    throw new Error(
      'Activity category "wellness" not found',
    );
  }

  if (!eventsCategory) {
    throw new Error(
      'Activity category "events" not found',
    );
  }


  // ============================================
  // INSERT ACTIVITIES
  // ============================================

  await db
    .insert(activities)
    .values([
      {
        name: 'Ayurvedic Massage',
        slug: 'ayurvedic-massage',
        description:
          'A traditional Ayurvedic massage experience designed for relaxation, wellness, and rejuvenation.',
        image:
          'https://example.com/images/ayurvedic-massage.jpg',
        location: 'Wellness Center',
        duration: '60 minutes',

        categoryId:
          wellnessCategory.id,

        status:
          ActivityStatus.PUBLISHED,
      },

      {
        name: 'Yoga Morning Session',
        slug: 'yoga-morning-session',
        description:
          'A guided morning yoga session focused on flexibility, breathing, mindfulness, and relaxation.',
        image:
          'https://example.com/images/yoga-morning.jpg',
        location: 'Yoga Pavilion',
        duration: '90 minutes',

        categoryId:
          wellnessCategory.id,

        status:
          ActivityStatus.PUBLISHED,
      },

      {
        name: 'Padel Court Experience',
        slug: 'padel-court-experience',
        description:
          'An enjoyable padel court experience suitable for recreational players and groups.',
        image:
          'https://example.com/images/padel-court.jpg',
        location: 'Padel Court',
        duration: '90 minutes',

        categoryId:
          padelCategory.id,

        status:
          ActivityStatus.PUBLISHED,
      },

      {
        name: 'Meditation & Breathwork',
        slug: 'meditation-breathwork',
        description:
          'A guided meditation and breathwork activity designed to improve relaxation and mental clarity.',
        image:
          'https://example.com/images/meditation.jpg',
        location: 'Wellness Center',
        duration: '45 minutes',

        categoryId:
          wellnessCategory.id,

        status:
          ActivityStatus.DRAFT,
      },

      {
        name: 'Sunrise Wellness Walk',
        slug: 'sunrise-wellness-walk',
        description:
          'A peaceful morning walking activity designed to explore the surrounding environment while practicing mindful breathing.',
        image:
          'https://example.com/images/sunrise-walk.jpg',
        location: 'Garden Area',
        duration: '60 minutes',

        categoryId:
          wellnessCategory.id,

        status:
          ActivityStatus.DRAFT,
      },

      {
        name: 'Private Wellness Consultation',
        slug: 'private-wellness-consultation',
        description:
          'A private consultation session providing personalized wellness recommendations based on individual needs.',
        location: 'Wellness Center',
        duration: '30 minutes',

        categoryId:
          wellnessCategory.id,

        status:
          ActivityStatus.DRAFT,
      },
    ])
    .onConflictDoNothing({
      target: activities.slug,
    });

  console.log(
    'Activities seeded successfully.',
  );
}

