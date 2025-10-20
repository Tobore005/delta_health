import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Head, useForm, usePage } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/dashboard/user' },
    { title: 'Profile', href: '/dashboard/user/profile' },
];

export default function Profile() {
    interface PageProps {
        user: {
            firstname: string;
            lastname: string;
            email: string;
            phone: string;
        };
        [key: string]: unknown;
    }

    const { user } = usePage<PageProps>().props;

    const { data, setData, put, processing, errors } = useForm({
        firstname: user.firstname || '',
        lastname: user.lastname || '',
        email: user.email || '',
        phone: user.phone || '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        put('/dashboard/user/profile');
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Profile" />
            <div className="max-w-2xl space-y-6 p-6">
                <h2 className="text-xl font-semibold">Profile Information</h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <Input
                        placeholder="First Name"
                        value={data.firstname}
                        onChange={(e) => setData('firstname', e.target.value)}
                    />
                    {errors.firstname && (
                        <p className="text-sm text-red-500">{errors.firstname}</p>
                    )}

                    <Input
                        placeholder="Last Name"
                        value={data.lastname}
                        onChange={(e) => setData('lastname', e.target.value)}
                    />
                    {errors.lastname && (
                        <p className="text-sm text-red-500">{errors.lastname}</p>
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
