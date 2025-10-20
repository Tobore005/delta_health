import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Head, router, usePage } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/dashboard/clinic' },
    { title: 'Appointments', href: '/dashboard/clinic/appointments' },
];

export default function Appointments() {
    type Appointment = {
        id: number;
        user: { name: string };
        service: string;
        date: string;
        time: string;
        status: 'pending' | 'confirmed' | 'cancelled' | 'completed' | 'rescheduled';
    };

    interface PageProps {
        appointments: Appointment[];
        [key: string]: unknown;
    }

    const { appointments } = usePage<PageProps>().props;
    const [selected, setSelected] = useState<Appointment | null>(null);
    const [formData, setFormData] = useState({ date: '', time: '' });
    const [isDialogOpen, setIsDialogOpen] = useState(false);


    const handleApprove = (id: number) => router.put(`/dashboard/clinic/appointments/${id}/approve`);
    const handleReject = (id: number) => router.put(`/dashboard/clinic/appointments/${id}/reject`);
    const handleComplete = (id: number) => router.put(`/dashboard/clinic/appointments/${id}/complete`);
    const handleActivate = (id: number) => router.put(`/dashboard/clinic/appointments/${id}/activate`);

    const handleReschedule = (e: React.FormEvent) => {
        e.preventDefault();
        if (!selected) return;

        router.put(`/dashboard/clinic/appointments/${selected.id}/reschedule`, formData, {
            onSuccess: () => {
                setSelected(null);
                setFormData({ date: '', time: '' });
                setIsDialogOpen(false);
            },
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Appointment Booking" />
            <div className="space-y-6 p-6">
                <div className="mt-10">
                    <h3 className="mb-3 font-semibold">Recent Appointments</h3>
                    <div className="space-y-2">
                        {appointments?.length ? (
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>User</TableHead>
                                        <TableHead>Symptoms</TableHead>
                                        <TableHead>Date</TableHead>
                                        <TableHead>Time</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead>Action</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {appointments.map((a: Appointment) => (
                                        <TableRow key={a.id}>
                                            <TableCell>{a.user.name}</TableCell>
                                            <TableCell>{a.service}</TableCell>
                                            <TableCell>{a.date}</TableCell>
                                            <TableCell>{a.time}</TableCell>
                                            <TableCell className="capitalize">
                                                {a.status}
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex flex-wrap gap-2">
                                                    {a.status === 'pending' && (
                                                        <>
                                                            <Button
                                                                onClick={() => handleApprove(a.id)}
                                                                size="sm"
                                                                className="bg-green-600 hover:bg-green-700 text-white"
                                                            >
                                                                Approve
                                                            </Button>
                                                            <Button
                                                                onClick={() => handleReject(a.id)}
                                                                size="sm"
                                                                className="bg-red-600 hover:bg-red-700 text-white"
                                                            >
                                                                Cancel
                                                            </Button>
                                                            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                                                                <DialogTrigger asChild>
                                                                    <Button
                                                                        size="sm"
                                                                        className="bg-orange-500 hover:bg-orange-600 text-white"
                                                                        onClick={() => {setSelected(a);setIsDialogOpen(true);}}
                                                                    >
                                                                        Reschedule
                                                                    </Button>
                                                                </DialogTrigger>
                                                                <DialogContent>
                                                                    <DialogHeader>
                                                                        <DialogTitle>
                                                                            Reschedule Appointment
                                                                        </DialogTitle>
                                                                        <DialogDescription>
                                                                            Update the date and time for{' '}
                                                                            <strong>{a.user.name}</strong>.
                                                                        </DialogDescription>
                                                                    </DialogHeader>
                                                                    <form
                                                                        onSubmit={handleReschedule}
                                                                        className="space-y-4"
                                                                    >
                                                                        <div>
                                                                            <label className="text-sm font-medium">
                                                                                Date
                                                                            </label>
                                                                            <Input
                                                                                type="date"
                                                                                value={formData.date}
                                                                                onChange={(e) =>
                                                                                    setFormData({
                                                                                        ...formData,
                                                                                        date: e.target.value,
                                                                                    })
                                                                                }
                                                                                required
                                                                            />
                                                                        </div>
                                                                        <div>
                                                                            <label className="text-sm font-medium">
                                                                                Time
                                                                            </label>
                                                                            <Input
                                                                                type="time"
                                                                                value={formData.time}
                                                                                onChange={(e) =>
                                                                                    setFormData({
                                                                                        ...formData,
                                                                                        time: e.target.value,
                                                                                    })
                                                                                }
                                                                                required
                                                                            />
                                                                        </div>
                                                                        <DialogFooter>
                                                                            <Button
                                                                                type="submit"
                                                                                className="bg-blue-600 hover:bg-blue-700 text-white"
                                                                            >
                                                                                Save Changes
                                                                            </Button>
                                                                        </DialogFooter>
                                                                    </form>
                                                                </DialogContent>
                                                            </Dialog>
                                                        </>
                                                    )}

                                                    {a.status === 'confirmed' || a.status === "rescheduled" && (
                                                        <>
                                                            <Button
                                                                onClick={() => handleComplete(a.id)}
                                                                size="sm"
                                                                className="bg-indigo-600 hover:bg-indigo-700 text-white"
                                                            >
                                                                Complete
                                                            </Button>
                                                            <Button
                                                                onClick={() => handleReject(a.id)}
                                                                size="sm"
                                                                className="bg-red-600 hover:bg-red-700 text-white"
                                                            >
                                                                Cancel
                                                            </Button>
                                                        </>
                                                    )}

                                                    {a.status === 'cancelled' && (
                                                        <Button
                                                            onClick={() => handleActivate(a.id)}
                                                            size="sm"
                                                            className="bg-yellow-500 hover:bg-yellow-600 text-white"
                                                        >
                                                            Restore
                                                        </Button>
                                                    )}

                                                    {a.status === 'completed' && (
                                                        <span className="text-gray-500">
                                                            No actions
                                                        </span>
                                                    )}
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        ) : (
                            <p className="text-gray-500">
                                No appointments yet.
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
