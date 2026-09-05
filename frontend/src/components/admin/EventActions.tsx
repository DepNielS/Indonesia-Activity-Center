'use client';

import Link from 'next/link';

import {
  publishAdminEvent,
  unpublishAdminEvent,
  cancelAdminEvent,
  type AdminEvent,
} from '@/src/lib/admin/events';

import {
  useAuth,
} from '@/src/context/AuthContext';

import {
  canPublishEvents,
  canCancelEvents,
} from '@/src/lib/admin/permissions';
import { useState } from 'react';

interface EventActionsProps {
  event: AdminEvent;
  onActionComplete: () => void;
}

export default function EventActions({
  event,
  onActionComplete,
}: EventActionsProps) {
  const { user } = useAuth();

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState('');

  const canPublish =
    user
      ? canPublishEvents(user.role)
      : false;

  const canCancel =
    user
      ? canCancelEvents(user.role)
      : false;

  async function handlePublish() {
    if (!canPublish) {
      return;
    }

    setLoading(true);
    setError('');

    try {
      await publishAdminEvent(
        event.id,
      );

      onActionComplete();
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : 'Failed to publish event.',
      );
    } finally {
      setLoading(false);
    }
  }

  async function handleUnpublish() {
    if (!canPublish) {
      return;
    }

    setLoading(true);
    setError('');

    try {
      await unpublishAdminEvent(
        event.id,
      );

      onActionComplete();
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : 'Failed to unpublish event.',
      );
    } finally {
      setLoading(false);
    }
  }

  async function handleCancel() {
    if (!canCancel) {
      return;
    }

    const confirmed =
      window.confirm(
        'Are you sure you want to cancel this event?',
      );

    if (!confirmed) {
      return;
    }

    setLoading(true);
    setError('');

    try {
      await cancelAdminEvent(
        event.id,
      );

      onActionComplete();
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : 'Failed to cancel event.',
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="admin-event-actions">
      <Link
        href={`/admin/events/${event.id}/edit`}
        className="admin-event-action-link"
      >
        Edit
      </Link>

      {canPublish &&
        event.status === 'DRAFT' && (
          <button
            type="button"
            onClick={handlePublish}
            disabled={loading}
          >
            {loading
              ? 'Processing...'
              : 'Publish'}
          </button>
        )}

      {canPublish &&
        event.status === 'PUBLISHED' && (
          <button
            type="button"
            onClick={handleUnpublish}
            disabled={loading}
          >
            {loading
              ? 'Processing...'
              : 'Unpublish'}
          </button>
        )}

      {canCancel &&
        event.status !== 'CANCELLED' && (
          <button
            type="button"
            onClick={handleCancel}
            disabled={loading}
          >
            Cancel
          </button>
        )}

      {error && (
        <p className="admin-event-action-error">
          {error}
        </p>
      )}
    </div>
  );
}