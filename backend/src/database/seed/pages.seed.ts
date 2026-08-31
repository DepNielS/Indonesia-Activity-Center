import { db } from '../../db/index';

import { pages } from '../schema';

const pageData = [
  {
    title: 'About Indonesia Activity Center',
    slug: 'about-indonesia-activity-center',
    excerpt:
      'Discover Indonesia Activity Center and everything we offer.',
    content:
      'Indonesia Activity Center is a destination designed to bring together hospitality, wellness, food, sports, and community experiences in one place.',
    image:
      'https://example.com/pages/about.jpg',
    status: 'PUBLISHED' as const,
  },

  {
    title: 'Resort',
    slug: 'resort',
    excerpt:
      'Experience a relaxing stay surrounded by nature and comfort.',
    content:
      'Our resort provides a comfortable environment for guests looking for relaxation, wellness, and memorable experiences.',
    image:
      'https://example.com/pages/resort.jpg',
    status: 'PUBLISHED' as const,
  },

  {
    title: 'Food & Dining',
    slug: 'food-and-dining',
    excerpt:
      'Enjoy carefully prepared food and authentic culinary experiences.',
    content:
      'Discover a variety of food and dining experiences featuring fresh ingredients and Indonesian culinary inspiration.',
    image:
      'https://example.com/pages/food.jpg',
    status: 'PUBLISHED' as const,
  },

  {
    title: 'Padel',
    slug: 'padel',
    excerpt:
      'Enjoy an active and social padel experience.',
    content:
      'Our padel facilities provide a modern environment for recreational players, members, and guests.',
    image:
      'https://example.com/pages/padel.jpg',
    status: 'PUBLISHED' as const,
  },

  {
    title: 'Ayurvedic Wellness',
    slug: 'ayurvedic-wellness',
    excerpt:
      'Explore holistic wellness experiences inspired by Ayurveda.',
    content:
      'Our Ayurvedic wellness experiences are designed to support relaxation and personal wellbeing through traditional practices.',
    image:
      'https://example.com/pages/ayurvedic.jpg',
    status: 'PUBLISHED' as const,
  },

  {
    title: 'Contact',
    slug: 'contact',
    excerpt:
      'Get in touch with Indonesia Activity Center.',
    content:
      'Contact our team to learn more about accommodation, dining, padel, wellness programs, and upcoming activities.',
    image:
      'https://example.com/pages/contact.jpg',
    status: 'PUBLISHED' as const,
  },

  {
    title: 'Membership',
    slug: 'membership',
    excerpt:
      'Learn more about becoming a member of Indonesia Activity Center.',
    content:
      'Membership information and benefits will be available here.',
    image:
      'https://example.com/pages/membership.jpg',
    status: 'DRAFT' as const,
  },

  {
    title: 'Wellness Programs',
    slug: 'wellness-programs',
    excerpt:
      'Explore our upcoming wellness programs and activities.',
    content:
      'Detailed information about our wellness programs will be published soon.',
    image:
      'https://example.com/pages/wellness-programs.jpg',
    status: 'DRAFT' as const,
  },
];

export async function seedPages() {
  console.log('Starting page seed...');

  await db
    .insert(pages)
    .values(pageData)
    .onConflictDoNothing();

  console.log('Page seed completed.');
}