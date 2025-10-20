import InputError from '@/components/input-error';
import PasswordInput from '@/components/password-input';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AuthLayout from '@/layouts/auth-layout';
import { Head, useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';

interface ResetPasswordProps {
    token: string;
    email: string;
}

export default function AdminResetPassword({
    token,
    email,
}: ResetPasswordProps) {
    const { data, setData, post, processing, errors, reset } = useForm({
        token,
        email,
        password: '',
        password_confirmation: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        post('/admin-reset-password', {
            preserveScroll: true,
            onSuccess: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <AuthLayout
            title="Reset password"
            description="Please enter your new password below"
        >
            <Head title="Reset password" />

            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Email */}
                <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        onChange={(e) => setData('email', e.target.value)}
                        readOnly
                        className="mt-1 block w-full"
                    />
                    <InputError message={errors.email} />
                </div>

                {/* New Password */}
                <PasswordInput
                    id="password"
                    name="password"
                    value={data.password}
                    onChange={(e) => setData('password', e.target.value)}
                    autoComplete="new-password"
                    placeholder="Enter new password"
                    label="New Password"
                    error={errors.password}
                />

                {/* Confirm Password */}
                <PasswordInput
                    id="password_confirmation"
                    label='Confirm Password'
                    name="password_confirmation"
                    value={data.password_confirmation}
                    onChange={(e) =>
                        setData('password_confirmation', e.target.value)
                    }
                    autoComplete="new-password"
                    placeholder="Confirm new password"
                    error={errors.password_confirmation}
                />

                <Button type="submit" className="w-full" disabled={processing}>
                    {processing && (
                        <LoaderCircle className="h-4 w-4 animate-spin" />
                    )}
                    Reset Password
                </Button>
            </form>
        </AuthLayout>
    );
}
