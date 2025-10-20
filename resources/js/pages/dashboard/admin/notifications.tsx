import AppLayout from '@/layouts/app-layout';
import { Head, router, usePage } from '@inertiajs/react';
import { BreadcrumbItem } from '@/types';
import { Button } from '@/components/ui/button';

const breadcrumbs: BreadcrumbItem[] = [
  { title: 'Dashboard', href: '/dashboard/admin' },
  { title: 'Notifications', href: '/dashboard/admin/notifications' },
];

type Notification = {
  id: string;
  read_at: string | null;
  data: {
    appointment_id: string;
    message: string;
    status: string;
  };
};

type PageProps = {
  notifications: Notification[];
};

export default function Notifications() {
  const { notifications } = usePage<PageProps>().props;

  const markAsRead = (id: string) => {
    router.put(`/dashboard/admin/notifications/${id}/read`);
  };

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Notifications" />
      <div className="p-6 max-w-3xl space-y-4">
        {notifications.length ? (
          notifications.map((n: Notification) => (
            <div
              key={n.id}
              className={`p-4 border rounded flex items-center justify-between ${
                n.read_at ? 'bg-gray-100' : 'bg-white'
              }`}
            >
              <p>{n.data.message}</p>
              {!n.read_at && (
                <Button size="sm" onClick={() => markAsRead(n.id)}>
                  Mark as Read
                </Button>
              )}
            </div>
          ))
        ) : (
          <p>No notifications yet.</p>
        )}
      </div>
    </AppLayout>
  );
}
