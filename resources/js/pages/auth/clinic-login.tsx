import Header from '@/components/header';
import PasswordInput from '@/components/password-input';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useForm } from '@inertiajs/react';
import { useState } from 'react';
import validator from 'validator';

interface ClinicLoginProps {
    status?: string;
}

export default function ClinicLogin({ status }: ClinicLoginProps) {
    const [loginError, setLoginError] = useState('');
    const { data, setData, post, processing, errors } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setLoginError('');
        if (!validator.isEmail(data.email)) {
            setLoginError('Please enter a valid clinic email address.');
            return;
        }
        post('/clinic-login', {
            preserveScroll: true,
            onError: (errs) => {
                if (errs && errs.email) {
                    setLoginError(errs.email);
                }
            },
        });
    };

    return (
        <div className="min-h-screen items-center justify-center bg-gradient-to-br from-white to-violet-50">
            <Header title="Clinic Login" />
            <div className="container mx-auto flex px-2 py-20 sm:px-4 lg:px-6 xl:px-8">
                <div className="container mx-auto px-2 sm:px-4 lg:px-6 xl:px-8">
                    <div className="grid w-full grid-cols-1 items-center gap-8 lg:grid-cols-2 lg:gap-8">
                        {/* Left side: Info and image */}
                        <div className="mx-auto w-full max-w-xl space-y-6 text-center lg:mx-0 lg:text-left">
                            <div className="flex flex-wrap justify-center gap-3 lg:justify-start">
                                <span className="rounded-full bg-green-100 px-4 py-1 text-xs font-semibold text-green-700">✔ Secure Login</span>
                                <span className="rounded-full bg-blue-100 px-4 py-1 text-xs font-semibold text-blue-700">
                                    ✔ Trusted Health Platform
                                </span>
                            </div>
                            <h1 className="text-3xl leading-tight font-bold text-black sm:text-4xl lg:text-5xl">
                                Welcome Back, <span className="text-violet-700">Clinic</span>
                            </h1>
                            <p className="mx-auto max-w-md text-gray-600 lg:mx-0">
                                Log in to manage appointments, patients, and more for your clinic.
                            </p>
                            <div className="mt-6 text-sm">
                                <p className="font-medium text-gray-700">📞 Need help?</p>
                                <p className="text-lg font-semibold text-violet-700">+234 906 548 4220</p>
                            </div>
                            <div className="mt-6 hidden lg:block">
                                <img src="/smiling.jpg" alt="Smiling Doctor" className="h-64 w-full rounded-xl object-cover shadow-md" />
                            </div>
                        </div>
                        {/* Right side: Login form */}
                        <div className="mx-auto w-full max-w-md rounded-2xl bg-white p-8 shadow-lg">
                            <h2 className="mb-2 text-center text-2xl font-bold text-violet-700">Clinic Login</h2>
                            <p className="mb-6 text-center text-gray-500">Enter your clinic email and password below to log in</p>

                            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                                <div className="grid gap-2">
                                    <label className="text-gray-700" htmlFor="email">
                                        Clinic Email Address
                                    </label>
                                    <Input
                                        id="email"
                                        type="email"
                                        name="email"
                                        required
                                        autoFocus
                                        tabIndex={1}
                                        autoComplete="username"
                                        placeholder="clinic@example.com"
                                        value={data.email}
                                        onChange={(e) => {
                                            setData('email', e.target.value);
                                            setLoginError('');
                                        }}
                                        className="input text-black"
                                    />
                                    {loginError && <p className="text-sm text-red-500">{loginError}</p>}
                                </div>

                                <PasswordInput
                                    id="password"
                                    name="password"
                                    label='Password'
                                    forgotLink='/clinic-forgot-password'
                                    required
                                    tabIndex={2}
                                    autoComplete="current-password"
                                    placeholder="Password"
                                    value={data.password}
                                    onChange={(e) => setData('password', e.target.value)}
                                    className="input text-black"
                                    error={errors.password}
                                />

                                <div className="flex items-center space-x-3 text-gray-600">
                                    <input
                                        type="checkbox"
                                        id="remember"
                                        name="remember"
                                        tabIndex={3}
                                        checked={data.remember}
                                        onChange={(e) => setData('remember', e.target.checked)}
                                    />
                                    <label htmlFor="remember">Remember me</label>
                                </div>

                                <Button
                                    type="submit"
                                    className="mt-4 w-full bg-violet-700 text-white hover:bg-violet-800"
                                    tabIndex={4}
                                    disabled={processing}
                                >
                                    {processing ? 'Logging in...' : 'Log in'}
                                </Button>
                            </form>

                            {status && <div className="mt-4 text-center text-sm font-medium text-green-600">{status}</div>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
