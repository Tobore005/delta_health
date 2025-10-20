import { useState, useMemo } from 'react';
// import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
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
import { Head, Link, usePage } from '@inertiajs/react';
import { Button } from '@/components/ui/button';

const breadcrumbs: BreadcrumbItem[] = [
  { title: 'Dashboard', href: '/dashboard/admin' },
  { title: 'Users', href: '/dashboard/admin/users' },
];

export default function UsersPage() {
  interface User {
    id: number;
    firstname: string;
    lastname: string;
    name: string;
    email: string;
  }
  
  interface UsersPageProps {
    users: User[];
  }
  
  const { users } = (usePage().props as unknown as UsersPageProps);
  const [search, setSearch] = useState('');

  // filter users by name or email
  const filteredUsers = useMemo(() => {
    const term = search.toLowerCase();
    return users.filter(
      (u) =>
        u.firstname?.toLowerCase().includes(term) ||
        u.lastname?.toLowerCase().includes(term) ||
        u.name?.toLowerCase().includes(term) ||
        u.email?.toLowerCase().includes(term)
    );
  }, [users, search]);

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Users" />
      <div className="space-y-6 p-6">
        <div className="flex items-center justify-between">
          <Input
            placeholder="Search users..."
            // className="max-w-md"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          {/* <Button variant="secondary">Filter</Button> */}
        </div>

        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>S/N</TableHead>
                <TableHead>First Name</TableHead>
                <TableHead>Last Name</TableHead>
                <TableHead>Full Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.length > 0 ? (
                filteredUsers.map((user, i) => (
                  <TableRow key={i}>
                    <TableCell>{i + 1}</TableCell>
                    <TableCell>{user.firstname}</TableCell>
                    <TableCell>{user.lastname}</TableCell>
                    <TableCell>{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>
                    <Link href={`/dashboard/admin/users/${user.id}`}>
                      <Button size="sm" variant="outline">View</Button>
                    </Link>
                  </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-4 text-gray-500">
                    No users found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </AppLayout>
  );
}
