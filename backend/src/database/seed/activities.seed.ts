import { db } from '../../db';
import {
  activities,
} from '../../database/schema';

export async function seedActivities() {
  console.log('Seeding activities...');

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
        status: 'PUBLISHED',
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
        status: 'PUBLISHED',
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
        status: 'PUBLISHED',
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
        status: 'DRAFT',
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
        status: 'DRAFT',
      },

      {
        name: 'Private Wellness Consultation',
        slug: 'private-wellness-consultation',
        description:
          'A private consultation session providing personalized wellness recommendations based on individual needs.',
        location: 'Wellness Center',
        duration: '30 minutes',
        status: 'DRAFT',
      },
    ])
    .onConflictDoNothing({
      target: activities.slug,
    });

  console.log('Activities seeded successfully.');
}