
'use client';

import {
  useEffect,
  useState,
} from 'react';

import { useRouter } from 'next/navigation';

import {
  useAuth,
} from '@/src/context/AuthContext';

import {
  createAdminActivity,
  getAdminActivities,
  updateAdminActivity,
  publishAdminActivity,
  unpublishAdminActivity,
  deleteAdminActivity,
  type AdminActivity,
  } from '@/src/lib/admin/activities';

import {
  getActivityCategories,
  type ActivityCategory,
} from '@/src/lib/api/activities';

import AdminHeader from '@/src/components/admin/AdminHeader';

import ActivityTable from '@/src/components/admin/ActivityTable';

import ActivityForm, {
  type ActivityFormData,
} from '@/src/components/admin/ActivityForm';

import { canCreateActivities } from '@/src/lib/admin/permissions';

export default function AdminPage() {
  const router = useRouter();

  const {
    user,
    loading: authLoading,
    isAuthenticated,
  } = useAuth();

  const [activities, setActivities] =
    useState<AdminActivity[]>([]);

  const [categories, setCategories] =
    useState<ActivityCategory[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState('');

  const [statusFilter, setStatusFilter] =
    useState<
      'ALL' | 'DRAFT' | 'PUBLISHED'
    >('ALL');

  const [categoryFilter, setCategoryFilter] =
    useState<number | 'ALL'>('ALL');

  const [showCreateForm, setShowCreateForm] =
    useState(false);

  const [editingActivity, setEditingActivity] =
    useState<AdminActivity | null>(null);  

  useEffect(() => {
    if (authLoading) {
      return;
    }

    if (!isAuthenticated || !user) {
      router.replace('/login');
      return;
    }

    async function loadAdminData() {
      try {
        setError('');

        const [
          activitiesData,
          categoriesData,
        ] = await Promise.all([
          getAdminActivities(),
          getActivityCategories(),
        ]);

        setActivities(
          activitiesData,
        );

        setCategories(
          categoriesData,
        );
      } catch (error) {
        setError(
          error instanceof Error
            ? error.message
            : 'Failed to load admin data',
        );
      } finally {
        setLoading(false);
      }
    }

    loadAdminData();
  }, [
    authLoading,
    isAuthenticated,
    user,
    router,
  ]);

  
async function handleCreateActivity(
  data: ActivityFormData,
) {
  await createAdminActivity({
    name: data.name,
    slug: data.slug,
    description: data.description,
    categoryId: data.categoryId,
    image: data.image || undefined,
    location: data.location || undefined,
    duration: data.duration || undefined,
  });

  setShowCreateForm(false);

  const updatedActivities =
    await getAdminActivities();

  setActivities(
    updatedActivities,
  );
}

function handleEditActivity(
  activity: AdminActivity,
) {
  setEditingActivity(activity);
  setShowCreateForm(false);
}


async function handleUpdateActivity(
  data: ActivityFormData,
) {
  if (!editingActivity) {
    return;
  }

  await updateAdminActivity(
    editingActivity.id,
    {
      name: data.name,
      slug: data.slug,
      description: data.description,
      categoryId: data.categoryId,
      image: data.image || undefined,
      location:
        data.location || undefined,
      duration:
        data.duration || undefined,
    },
  );

  setEditingActivity(null);

  const updatedActivities =
    await getAdminActivities();

  setActivities(
    updatedActivities,
  );
}


async function handlePublishActivity(
  activity: AdminActivity,
) {
  await publishAdminActivity(
    activity.id,
  );

  const updatedActivities =
    await getAdminActivities();

  setActivities(
    updatedActivities,
  );
}


async function handleUnpublishActivity(
  activity: AdminActivity,
) {
  await unpublishAdminActivity(
    activity.id,
  );

  const updatedActivities =
    await getAdminActivities();

  setActivities(
    updatedActivities,
  );
}


async function handleDeleteActivity(
  activity: AdminActivity,
) {
  const confirmed =
    window.confirm(
      `Are you sure you want to delete "${activity.name}"?`,
    );

  if (!confirmed) {
    return;
  }

  await deleteAdminActivity(
    activity.id,
  );

  const updatedActivities =
    await getAdminActivities();

  setActivities(
    updatedActivities,
  );
}





  const filteredActivities =
    activities.filter((activity) => {
      const matchesStatus =
        statusFilter === 'ALL' ||
        activity.status ===
          statusFilter;

      const matchesCategory =
        categoryFilter === 'ALL' ||
        activity.categoryId ===
          categoryFilter;

      return (
        matchesStatus &&
        matchesCategory
      );
    });

  if (authLoading) {
    return (
      <main>
        <section>
          <p>
            Checking authentication...
          </p>
        </section>
      </main>
    );
  }

  if (!isAuthenticated || !user) {
    return null;
  }
return (
  
    <main>
      <AdminHeader />

      <section>
        <div>
          <div>
            <span>
              CONTENT MANAGEMENT
            </span>

            <h2>
              Activities
            </h2>

            <p>
              Manage activities available
              on Indonesia Activity Center.
            </p>
          </div>

          {user &&
            canCreateActivities(user.role) && (
              <button
                type="button"
                onClick={() =>
                  setShowCreateForm(true)
                }
              >
                Create Activity
              </button>
            )}
        </div>

        {showCreateForm && (
          <section>
            <div>
              <h2>
                Create Activity
              </h2>

              <ActivityForm
                categories={categories}
                onSubmit={
                  handleCreateActivity
                }
                onCancel={() =>
                  setShowCreateForm(false)
                }
              />
            </div>
          </section>
        )}

        {editingActivity && (
          <section>
            <div>
              <h2>
                Edit Activity
              </h2>

              <ActivityForm
                categories={categories}
                initialData={
                  editingActivity
                }
                onSubmit={
                  handleUpdateActivity
                }
                onCancel={() =>
                  setEditingActivity(null)
                }
              />
            </div>
          </section>
        )}

        <section>
          <div>
            <div>
              <label htmlFor="status-filter">
                Status
              </label>

              <select
                id="status-filter"
                value={statusFilter}
                onChange={(event) =>
                  setStatusFilter(
                    event.target.value as
                      | 'ALL'
                      | 'DRAFT'
                      | 'PUBLISHED',
                  )
                }
              >
                <option value="ALL">
                  All Status
                </option>

                <option value="DRAFT">
                  Draft
                </option>

                <option value="PUBLISHED">
                  Published
                </option>
              </select>
            </div>

            <div>
              <label htmlFor="category-filter">
                Category
              </label>

              <select
                id="category-filter"
                value={categoryFilter}
                onChange={(event) => {
                  const value =
                    event.target.value;

                  setCategoryFilter(
                    value === 'ALL'
                      ? 'ALL'
                      : Number(value),
                  );
                }}
              >
                <option value="ALL">
                  All Categories
                </option>

                {categories.map(
                  (category) => (
                    <option
                      key={category.id}
                      value={category.id}
                    >
                      {category.name}
                    </option>
                  ),
                )}
              </select>
            </div>
          </div>

          {!loading &&
            !error && (
              <p>
                Showing{' '}
                {filteredActivities.length}{' '}
                of {activities.length}{' '}
                activities
              </p>
            )}

          {loading && (
            <p>
              Loading activities...
            </p>
          )}

          {error && (
            <p>
              Error: {error}
            </p>
          )}

          {!loading &&
            !error && (
              <ActivityTable
                activities={
                  filteredActivities
                }
                categories={categories}
                role={user.role}
                onEdit={
                  handleEditActivity
                }
                onPublish={
                  handlePublishActivity
                }
                onUnpublish={
                  handleUnpublishActivity
                }
                onDelete={
                  handleDeleteActivity
                }
              />
            )}
        </section>
      </section>
    </main>
);


}

