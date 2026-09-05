
'use client';

import AdminLayout from '@/src/components/admin/AdminLayout';
import { useAuth } from '@/src/context/AuthContext';
import {getDashboardStats, } from '@/src/lib/admin/dashboard';
import Link from 'next/link';
import { useEffect, useState } from 'react';

  


export default function AdminDashboardPage() {
  const {
    user,
    loading,
  } = useAuth();

  const [stats, setStats] =
    useState({
      totalActivities: 0,
      publishedActivities: 0,
      draftActivities: 0,
    });

  const [statsLoading, setStatsLoading] =
    useState(true);


useEffect(() => {
  if (!user) {
    return;
  }

  async function loadStats() {
    try {
      setStatsLoading(true);

      const dashboardStats =
        await getDashboardStats();

      setStats(dashboardStats);
    } catch (error) {
      console.error(
        'Failed to load dashboard statistics:',
        error,
      );
    } finally {
      setStatsLoading(false);
    }
  }

  loadStats();
}, [user]);


  



  if (loading) {
    return (
      <p>
        Loading...
      </p>
    );
  }

  if (!user) {
    return null;
  }

  return (
    
      
        <main>
          <section className="admin-dashboard-intro">
            <h2>
              Welcome to the Admin Dashboard
            </h2>

            <p>
              Manage Indonesia Activity Center
              content from this dashboard.
            </p>
          </section>


          <section className="admin-dashboard-stats">
            <div className="admin-stat-card">
              <span>
                TOTAL ACTIVITIES
              </span>

              <strong>
                {statsLoading
                  ? '...'
                  : stats.totalActivities}
              </strong>

              <p>
                All activities in the system
              </p>
            </div>

            <div className="admin-stat-card">
              <span>
                PUBLISHED
              </span>

              <strong>
                {statsLoading
                  ? '...'
                  : stats.publishedActivities}
              </strong>

              <p>
                Currently visible to visitors
              </p>
            </div>

            <div className="admin-stat-card">
              <span>
                DRAFT
              </span>

              <strong>
                {statsLoading
                  ? '...'
                  : stats.draftActivities}
              </strong>

              <p>
                Not currently published
              </p>
            </div>
          </section>


          <section className="admin-dashboard-quick-access">
            <div className="admin-dashboard-section-header">
              <div>
                <span>
                  MANAGEMENT
                </span>

                <h3>
                  Quick Access
                </h3>
              </div>
            </div>

            <div className="admin-dashboard-links">
              <Link
                href="/admin/activities"
                className="admin-dashboard-link-card"
              >
                <div>
                  <strong>
                    Activities
                  </strong>

                  <p>
                    Manage activities, publishing
                    status, and content.
                  </p>
                </div>

                <span>
                  →
                </span>
              </Link>

              <Link
                href="/admin/categories"
                className="admin-dashboard-link-card"
              >
                <div>
                  <strong>
                    Categories
                  </strong>

                  <p>
                    Manage activity categories
                    and classification.
                  </p>
                </div>

                <span>
                  →
                </span>
              </Link>

              <Link
                href="/admin/events"
                className="admin-dashboard-link-card"
              >
                <div>
                  <strong>
                    Events
                  </strong>

                  <p>
                    Manage events and event
                    content.
                  </p>
                </div>

                <span>
                  →
                </span>
              </Link>
            </div>
          </section>



        </main>

  
  );
}

