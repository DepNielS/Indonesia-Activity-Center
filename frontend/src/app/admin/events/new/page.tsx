'use client';

import { useRouter } from 'next/navigation';

import EventForm, {
  type EventFormData,
} from '@/src/components/admin/EventForm';

import {
  createAdminEvent,
} from '@/src/lib/admin/events';

export default function NewEventPage() {
  const router = useRouter();

  async function handleSubmit(
    data: EventFormData,
  ) {
    await createAdminEvent({
      title: data.title,
      slug: data.slug,
      description: data.description,
      image: data.image || undefined,
      startAt: data.startAt,
      endAt: data.endAt,
      location:
        data.location || undefined,
    });

    router.push('/admin/events');
  }

  function handleCancel() {
    router.push('/admin/events');
  }

  return (
    <div className="admin-event-create-page">
      <div className="admin-page-header">
        <div>
          <p className="admin-page-eyebrow">
            EVENT MANAGEMENT
          </p>

          <h2>
            Create Event
          </h2>

          <p>
            Create a new event. New events
            are created as drafts.
          </p>
        </div>
      </div>

      <EventForm
        onSubmit={handleSubmit}
        onCancel={handleCancel}
      />
    </div>
  );
}