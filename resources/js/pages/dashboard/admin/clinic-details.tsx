import { Button } from '@/components/ui/button';
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
import { Head, router, usePage } from '@inertiajs/react';

interface Clinic {
    id: string;
    name: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    state: string;
    country: string;
    description: string;
    working_hours: string;
    is_approved: boolean;
    appointments?: Appointment[];
}

interface Appointment {
    id: string;
    date: string;
    time: string;
    status: string;
    user?: { name: string; email: string };
}

export default function ClinicDetails() {
    // Remove explicit PageProps interface and generic argument
    const { clinic } = usePage().props as unknown as { clinic: Clinic };

    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Dashboard', href: '/dashboard/admin' },
        { title: 'Clinics', href: '/dashboard/admin/clinics' },
        { title: clinic.name, href: `/dashboard/admin/clinics/${clinic.id}` },
    ];

    const handleApprove = () =>
        router.put(`/dashboard/admin/clinics/${clinic.id}/approve`);
    const handleUnapprove = () =>
        router.put(`/dashboard/admin/clinics/${clinic.id}/unapprove`);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Clinic - ${clinic.name}`} />

            <div className="space-y-8 p-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="mb-2 text-2xl font-semibold">
                            {clinic.name}
                        </h1>
                        <p className="text-gray-600">{clinic.description}</p>
                    </div>
                    {clinic.is_approved ? (
                        <Button
                            onClick={handleUnapprove}
                            size="sm"
                            className="bg-red-600 text-white hover:bg-red-700"
                        >
                            Unapprove
                        </Button>
                    ) : (
                        <Button
                            onClick={handleApprove}
                            size="sm"
                            className="bg-green-600 text-white hover:bg-green-700"
                        >
                            Approve
                        </Button>
                    )}
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <strong>Email:</strong> {clinic.email}
                    </div>
                    <div>
                        <strong>Phone:</strong> {clinic.phone}
                    </div>
                    <div>
                        <strong>Address:</strong> {clinic.address}
                    </div>
                    <div>
                        <strong>City:</strong> {clinic.city}
                    </div>
                    <div>
                        <strong>State:</strong> {clinic.state}
                    </div>
                    <div>
                        <strong>Country:</strong> {clinic.country}
                    </div>
                    <div>
                        <strong>Working Hours:</strong> {clinic.working_hours}
                    </div>
                    <div>
                        <strong>Status:</strong>{' '}
                        {clinic.is_approved ? 'Approved' : 'Pending'}
                    </div>
                </div>

                <div>
                    <h2 className="mt-6 mb-2 text-xl font-semibold">
                        Appointments
                    </h2>
                    {clinic.appointments && clinic.appointments.length > 0 ? (
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>S/N</TableHead>
                                    <TableHead>Patient</TableHead>
                                    <TableHead>Date</TableHead>
                                    <TableHead>Time</TableHead>
                                    <TableHead>Status</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {clinic.appointments.map((a, i) => (
                                    <TableRow key={i}>
                                        <TableCell>{i + 1}</TableCell>
                                        <TableCell>
                                            {a.user?.name || 'N/A'}
                                        </TableCell>
                                        <TableCell>{a.date}</TableCell>
                                        <TableCell>{a.time}</TableCell>
                                        <TableCell className="capitalize">
                                            {a.status}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    ) : (
                        <p className="text-gray-500">
                            No appointments found for this clinic.
                        </p>
                    )}
                </div>
            </div>
        </AppLayout>
    );
}
