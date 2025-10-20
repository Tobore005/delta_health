import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Head, useForm, usePage } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/dashboard/admin' },
    { title: 'Profile', href: '/dashboard/admin/profile' },
];

export default function Profile() {
    interface PageProps {
        admin: {
            name: string;
            email: string;
            phone: string;
        };
        [key: string]: unknown;
    }

    const { admin } = usePage<PageProps>().props;

    const { data, setData, put, processing, errors } = useForm({
        name: admin.name || '',
        email: admin.email || '',
        phone: admin.phone || '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        put('/dashboard/admin/profile');
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Profile" />
            <div className="max-w-2xl space-y-6 p-6">
                <h2 className="text-xl font-semibold">Profile Information</h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <Input
                        placeholder="First Name"
                        value={data.name}
                        onChange={(e) => setData('name', e.target.value)}
                    />
                    {errors.name && (
                        <p className="text-sm text-red-500">{errors.name}</p>
                    )}

                    <Input
                        placeholder="Email Address"
                        type="email"
                        value={data.email}
                        onChange={(e) => setData('email', e.target.value)}
                    />
                    {errors.email && (
                        <p className="text-sm text-red-500">{errors.email}</p>
                    )}

                    <Input
                        placeholder="Phone Number"
                        type="tel"
                        value={data.phone}
                        onChange={(e) => setData('phone', e.target.value)}
                    />
                    {errors.phone && (
                        <p className="text-sm text-red-500">{errors.phone}</p>
                    )}

                    <Button type="submit" disabled={processing}>
                        {processing ? 'Saving...' : 'Save Changes'}
                    </Button>
                </form>
            </div>
        </AppLayout>
    );
}
