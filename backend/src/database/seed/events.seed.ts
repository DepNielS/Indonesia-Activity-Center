import { db } from '../../db/index';

import { events } from '../schema';

const eventData = [
  {
    title: 'Indonesia Activity Center Grand Opening',
    slug: 'indonesia-activity-center-grand-opening',
    description:
      'Grand opening event of Indonesia Activity Center.',
    image:
      'https://example.com/events/grand-opening.jpg',
    startAt: new Date('2026-09-01T09:00:00'),
    endAt: new Date('2026-09-01T12:00:00'),
    location: 'Indonesia Activity Center',
    status: 'PUBLISHED' as const,
  },

  {
    title: 'Morning Padel Session',
    slug: 'morning-padel-session',
    description:
      'Morning padel session for members and guests.',
    image:
      'https://example.com/events/morning-padel.jpg',
    startAt: new Date('2026-09-03T07:00:00'),
    endAt: new Date('2026-09-03T09:00:00'),
    location: 'Padel Court',
    status: 'PUBLISHED' as const,
  },

  {
    title: 'Ayurvedic Wellness Workshop',
    slug: 'ayurvedic-wellness-workshop',
    description:
      'A wellness workshop introducing Ayurvedic practices.',
    image:
      'https://example.com/events/ayurvedic-workshop.jpg',
    startAt: new Date('2026-09-05T10:00:00'),
    endAt: new Date('2026-09-05T13:00:00'),
    location: 'Wellness Center',
    status: 'PUBLISHED' as const,
  },

  {
    title: 'Weekend Food Festival',
    slug: 'weekend-food-festival',
    description:
      'A weekend event featuring food and local culinary experiences.',
    image:
      'https://example.com/events/food-festival.jpg',
    startAt: new Date('2026-09-07T16:00:00'),
    endAt: new Date('2026-09-07T21:00:00'),
    location: 'Activity Center Garden',
    status: 'PUBLISHED' as const,
  },

  {
    title: 'Sunset Padel Tournament',
    slug: 'sunset-padel-tournament',
    description:
      'Friendly sunset padel tournament for registered participants.',
    image:
      'https://example.com/events/sunset-padel.jpg',
    startAt: new Date('2026-09-10T16:00:00'),
    endAt: new Date('2026-09-10T20:00:00'),
    location: 'Padel Court',
    status: 'PUBLISHED' as const,
  },

  {
    title: 'Yoga and Meditation Class',
    slug: 'yoga-and-meditation-class',
    description:
      'A relaxing yoga and meditation class for beginners.',
    image:
      'https://example.com/events/yoga-meditation.jpg',
    startAt: new Date('2026-09-12T08:00:00'),
    endAt: new Date('2026-09-12T10:00:00'),
    location: 'Wellness Center',
    status: 'DRAFT' as const,
  },

  {
    title: 'Healthy Cooking Workshop',
    slug: 'healthy-cooking-workshop',
    description:
      'Cooking workshop focused on healthy local ingredients.',
    image:
      'https://example.com/events/healthy-cooking.jpg',
    startAt: new Date('2026-09-15T10:00:00'),
    endAt: new Date('2026-09-15T13:00:00'),
    location: 'Restaurant Area',
    status: 'DRAFT' as const,
  },

  {
    title: 'Community Gathering',
    slug: 'community-gathering',
    description:
      'A community gathering for guests and local participants.',
    image:
      'https://example.com/events/community-gathering.jpg',
    startAt: new Date('2026-09-18T17:00:00'),
    endAt: new Date('2026-09-18T20:00:00'),
    location: 'Main Garden',
    status: 'DRAFT' as const,
  },

  {
    title: 'Creative Photography Workshop',
    slug: 'creative-photography-workshop',
    description:
      'Photography workshop focusing on creative outdoor photography.',
    image:
      'https://example.com/events/photography-workshop.jpg',
    startAt: new Date('2026-09-20T09:00:00'),
    endAt: new Date('2026-09-20T12:00:00'),
    location: 'Activity Center',
    status: 'DRAFT' as const,
  },

  {
    title: 'Private Wellness Retreat',
    slug: 'private-wellness-retreat',
    description:
      'A private wellness retreat program for selected participants.',
    image:
      'https://example.com/events/private-retreat.jpg',
    startAt: new Date('2026-09-22T08:00:00'),
    endAt: new Date('2026-09-24T17:00:00'),
    location: 'Wellness Center',
    status: 'CANCELLED' as const,
  },

  {
    title: 'Night Padel Championship',
    slug: 'night-padel-championship',
    description:
      'Night padel championship event.',
    image:
      'https://example.com/events/night-padel.jpg',
    startAt: new Date('2026-09-25T18:00:00'),
    endAt: new Date('2026-09-25T22:00:00'),
    location: 'Padel Court',
    status: 'CANCELLED' as const,
  },

  {
    title: 'Traditional Food Experience',
    slug: 'traditional-food-experience',
    description:
      'Traditional Indonesian food experience for guests.',
    image:
      'https://example.com/events/traditional-food.jpg',
    startAt: new Date('2026-09-28T18:00:00'),
    endAt: new Date('2026-09-28T21:00:00'),
    location: 'Restaurant Area',
    status: 'CANCELLED' as const,
  },
];

export async function seedEvents() {
  console.log('Starting event seed...');

  await db
    .insert(events)
    .values(eventData)
    .onConflictDoNothing();

  console.log('Event seed completed.');
}