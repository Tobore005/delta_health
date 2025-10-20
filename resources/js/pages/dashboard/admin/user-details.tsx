import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Head, usePage } from '@inertiajs/react';

interface Appointment {
  id: number;
  date: string;
  time: string;
  status: string;
  clinic?: {
    name: string;
    email: string;
  };
}

interface User {
  id: number;
  firstname: string;
  lastname: string;
  name: string;
  email: string;
  appointments?: Appointment[];
}

export default function UserDetails() {
  const { user } = usePage().props as unknown as { user: User };

  const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/dashboard/admin' },
    { title: 'Users', href: '/dashboard/admin/users' },
    { title: user.name, href: `/dashboard/admin/users/${user.id}` },
  ];

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title={`User - ${user.name}`} />

      <div className="space-y-8 p-6">
        {/* User Info */}
        <div>
          <h1 className="mb-2 text-2xl font-semibold">{user.name}</h1>
          <p className="text-gray-600">{user.email}</p>
        </div>

        {/* Appointments Section */}
        <div>
          <h2 className="mt-6 mb-3 text-xl font-semibold">Appointments</h2>

          {user.appointments && user.appointments.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>S/N</TableHead>
                  <TableHead>Clinic</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Time</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {user.appointments.map((a, i) => (
                  <TableRow key={i}>
                    <TableCell>{i + 1}</TableCell>
                    <TableCell>{a.clinic?.name || 'N/A'}</TableCell>
                    <TableCell>{a.date}</TableCell>
                    <TableCell>{a.time}</TableCell>
                    <TableCell className="capitalize">{a.status}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <p className="text-gray-500">No appointments found for this user.</p>
          )}
        </div>
      </div>
    </AppLayout>
  );
}
