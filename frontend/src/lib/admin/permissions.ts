import type { UserRole } from '@/src/context/AuthContext';

export function canManageActivities(
  role: UserRole,
): boolean {
  return (
    role === 'SUPER_ADMIN' ||
    role === 'ADMIN'
  );
}

export function canPublishActivities(
  role: UserRole,
): boolean {
  return (
    role === 'SUPER_ADMIN' ||
    role === 'ADMIN'
  );
}

export function canDeleteActivities(
  role: UserRole,
): boolean {
  return (
    role === 'SUPER_ADMIN' ||
    role === 'ADMIN'
  );
}

export function canCreateActivities(
  role: UserRole,
): boolean {
  return (
    role === 'SUPER_ADMIN' ||
    role === 'ADMIN' ||
    role === 'EDITOR'
  );
}

export function canEditActivities(
  role: UserRole,
): boolean {
  return (
    role === 'SUPER_ADMIN' ||
    role === 'ADMIN' ||
    role === 'EDITOR'
  );
}

export function canManageEvents(
  role: UserRole,
): boolean {
  return (
    role === 'SUPER_ADMIN' ||
    role === 'ADMIN'
  );
}

export function canPublishEvents(
  role: UserRole,
): boolean {
  return (
    role === 'SUPER_ADMIN' ||
    role === 'ADMIN'
  );
}

export function canCancelEvents(
  role: UserRole,
): boolean {
  return (
    role === 'SUPER_ADMIN' ||
    role === 'ADMIN'
  );
}

export function canCreateEvents(
  role: UserRole,
): boolean {
  return (
    role === 'SUPER_ADMIN' ||
    role === 'ADMIN' ||
    role === 'EDITOR'
  );
}

export function canEditEvents(
  role: UserRole,
): boolean {
  return (
    role === 'SUPER_ADMIN' ||
    role === 'ADMIN' ||
    role === 'EDITOR'
  );
}