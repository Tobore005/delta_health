import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, usePage } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard/user',
    },
];

type Appointment = {
    id: number;
    clinic?: { name: string };
    service: string;
    date: string;
    time: string;
    status: string;
};

type Stats = {
    appointments: number;
    pending: number;
    approved: number;
};

type PageProps = {
    appointments: Appointment[];
    stats: Stats;
};

export default function Dashboard() {
    const { appointments, stats } = usePage<PageProps>().props;
    console.log(appointments)

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Clinic Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                    {/* Total Appointments */}
                    <div className="relative flex flex-col justify-center overflow-hidden rounded-xl border border-sidebar-border/70 p-4 dark:border-sidebar-border">
                        <h3 className="text-lg font-semibold">
                            Total Appointments
                        </h3>
                        <p className="mt-2 text-3xl font-bold">
                            {stats.appointments}
                        </p>
                    </div>

                    {/* Pending Appointments */}
                    <div className="relative flex flex-col justify-center overflow-hidden rounded-xl border border-sidebar-border/70 p-4 dark:border-sidebar-border">
                        <h3 className="text-lg font-semibold">
                            Pending Appointments
                        </h3>
                        <p className="mt-2 text-3xl font-bold">
                            {stats.pending}
                        </p>
                    </div>

                    {/* Approved Appointments */}
                    <div className="relative flex flex-col justify-center overflow-hidden rounded-xl border border-sidebar-border/70 p-4 dark:border-sidebar-border">
                        <h3 className="text-lg font-semibold">
                            Approved Appointments
                        </h3>
                        <p className="mt-2 text-3xl font-bold">
                            {stats.approved}
                        </p>
                    </div>
                </div>

                {/* Appointments List */}
                <div className="relative flex-1 overflow-hidden rounded-xl border border-sidebar-border/70 p-4 dark:border-sidebar-border">
                    <h3 className="mb-4 text-lg font-semibold">
                        Upcoming Appointments
                    </h3>

                    {appointments && appointments?.length > 0 ? (
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Clinic</TableHead>
                                    <TableHead>Service</TableHead>
                                    <TableHead>Date</TableHead>
                                    <TableHead>Time</TableHead>
                                    <TableHead>Status</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {appointments.map((a: Appointment) => (
                                    <TableRow key={a.id}>
                                        <TableCell>
                                            {a.clinic ? a.clinic.name : 'N/A'}
                                        </TableCell>
                                        <TableCell>{a.service}</TableCell>
                                        <TableCell>{a.date}</TableCell>
                                        <TableCell>{a.time}</TableCell>
                                        <TableCell className='capitalize'>{a.status}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    ) : (
                        <p>No appointments found.</p>
                    )}
                </div>
            </div>
        </AppLayout>
    );
}
