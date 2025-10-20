import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { usePage } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard/admin',
    },
];

type Admin = {
    id: number;
    name: string;
    address: string;
    city: string;
    state: string;
    country: string;
    phone: string;
    email: string;
    working_hours: string;
    is_approved: boolean;
    created_at: string;
};

type Stats = {
    users: number;
    clinics: number;
    appointments: number;
};

type PageProps = {
    clinics: Admin[];
    stats: Stats;
};

export default function Dashboard() {
    const { clinics, stats } = usePage<PageProps>().props;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Admin Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                    {/* Total Appointments */}
                    <div className="relative flex flex-col justify-center overflow-hidden rounded-xl border border-sidebar-border/70 p-4 dark:border-sidebar-border">
                        <h3 className="text-lg font-semibold">Total Users</h3>
                        <p className="text-3xl font-bold mt-2">{stats.users}</p>
                    </div>

                    {/* Pending Appointments */}
                    <div className="relative flex flex-col justify-center overflow-hidden rounded-xl border border-sidebar-border/70 p-4 dark:border-sidebar-border">
                        <h3 className="text-lg font-semibold">Total Admins</h3>
                        <p className="text-3xl font-bold mt-2">{stats.clinics}</p>
                    </div>

                    {/* Approved Appointments */}
                    <div className="relative flex flex-col justify-center overflow-hidden rounded-xl border border-sidebar-border/70 p-4 dark:border-sidebar-border">
                        <h3 className="text-lg font-semibold">Total Appointments</h3>
                        <p className="text-3xl font-bold mt-2">{stats.appointments}</p>
                    </div>
                </div>

                {/* Appointments List */}
                <div className="relative flex-1 overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border p-4">
                    <h3 className="text-lg font-semibold mb-4">Admins</h3>

                    {clinics && clinics.length > 0 ? (
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Name</TableHead>
                                    <TableHead>Address</TableHead>
                                    <TableHead>City</TableHead>
                                    <TableHead>State</TableHead>
                                    <TableHead>Country</TableHead>
                                    <TableHead>Phone</TableHead>
                                    <TableHead>Email</TableHead>
                                    <TableHead>Working Hours</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead>Registered On</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {clinics.map((a: Admin) => (
                                    <TableRow key={a.id}>
                                        <TableCell>{a.name}</TableCell>
                                        <TableCell>{a.address}</TableCell>
                                        <TableCell>{a.city}</TableCell>
                                        <TableCell>{a.state}</TableCell>
                                        <TableCell>{a.country}</TableCell>
                                        <TableCell>{a.phone}</TableCell>
                                        <TableCell>{a.email}</TableCell>
                                        <TableCell>{a.working_hours}</TableCell>
                                        <TableCell>{a.is_approved ? 'Approved' : "Unapproved"}</TableCell>
                                        <TableCell>{a.created_at}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    ) : (
                        <p className='text-gray-500'>No clinics found.</p>
                    )}
                </div>
            </div>
        </AppLayout>
    );
}
