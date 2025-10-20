import Header from '@/components/header';
import InputError from '@/components/input-error';
import LocationPicker from '@/components/LocationPicker';
import PasswordInput from '@/components/password-input';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { CountryDropdown } from '@/components/ui/country-dropdown';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { login } from '@/routes';
import { useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import React from 'react';

export default function Register() {
    const [registerType, setRegisterType] = React.useState<'user' | 'clinic'>(
        'user',
    );
    const [coords, setCoords] = React.useState<{
        lat: number | null;
        lng: number | null;
    }>({
        lat: null,
        lng: null,
    });

    const detectLocation = () => {
        if (!navigator.geolocation) {
            alert('Geolocation is not supported by your browser.');
            return;
        }
        navigator.geolocation.getCurrentPosition(
            (pos) => {
                setCoords({
                    lat: pos.coords.latitude,
                    lng: pos.coords.longitude,
                });
            },
            () => alert('Unable to retrieve your location.'),
        );
    };

    React.useEffect(() => {
        if (registerType === 'clinic' && !coords.lat && !coords.lng) {
            detectLocation();
        }
    }, [coords.lat, coords.lng, registerType]);

    const { data, setData, post, processing, errors } = useForm({
        register_type: 'user',
        firstname: '',
        lastname: '',
        email: '',
        phone: '',
        password: '',
        password_confirmation: '',
        // clinic-specific
        clinic_name: '',
        address: '',
        city: '',
        state: '',
        country: 'Nigeria',
        working_days: '',
        working_hours: '',
        lat: coords.lat,
        lng: coords.lng,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('coords', coords);
        setData('lat', coords.lat);
        setData('lng', coords.lng);
        console.log(data);
        post('/register', { preserveScroll: true }); // or route('register.store')
    };

    return (
        <div className="flex min-h-screen flex-col bg-gradient-to-br from-white to-violet-50">
            <Header title="Register" />
            <div className="flex flex-1 items-center justify-center">
                <div className="w-full max-w-xl rounded-2xl bg-white p-8 shadow-lg">
                    <h2 className="mb-2 text-center text-2xl font-bold text-violet-700">
                        Create an account
                    </h2>
                    <p className="mb-6 text-center text-gray-500">
                        Enter your details below to create your account
                    </p>
                    <div className="mb-4 flex justify-center gap-4">
                        <Button
                            type="button"
                            variant={
                                registerType === 'user' ? 'default' : 'outline'
                            }
                            onClick={() => {
                                setRegisterType('user');
                                setData('register_type', 'user');
                            }}
                        >
                            User
                        </Button>
                        <Button
                            type="button"
                            variant={
                                registerType === 'clinic'
                                    ? 'default'
                                    : 'outline'
                            }
                            onClick={() => {
                                setRegisterType('clinic');
                                setData('register_type', 'clinic');
                            }}
                        >
                            Clinic
                        </Button>
                    </div>

                    <form
                        onSubmit={handleSubmit}
                        className="flex flex-col gap-6"
                    >
                        <div className="grid gap-6">
                            {registerType === 'user' && (
                                <>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="grid gap-2">
                                            <Label htmlFor="firstname">
                                                First Name
                                            </Label>
                                            <Input
                                                id="firstname"
                                                value={data.firstname}
                                                onChange={(e) =>
                                                    setData(
                                                        'firstname',
                                                        e.target.value,
                                                    )
                                                }
                                                required
                                            />
                                            <InputError
                                                message={errors.firstname}
                                            />
                                        </div>
                                        <div className="grid gap-2">
                                            <Label htmlFor="lastname">
                                                Last Name
                                            </Label>
                                            <Input
                                                id="lastname"
                                                value={data.lastname}
                                                onChange={(e) =>
                                                    setData(
                                                        'lastname',
                                                        e.target.value,
                                                    )
                                                }
                                                required
                                            />
                                            <InputError
                                                message={errors.lastname}
                                            />
                                        </div>
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="email">Email</Label>
                                        <Input
                                            id="email"
                                            type="email"
                                            value={data.email}
                                            onChange={(e) =>
                                                setData('email', e.target.value)
                                            }
                                            required
                                        />
                                        <InputError message={errors.email} />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="phone">Phone</Label>
                                        <Input
                                            id="phone"
                                            value={data.phone}
                                            onChange={(e) =>
                                                setData('phone', e.target.value)
                                            }
                                            required
                                        />
                                        <InputError message={errors.phone} />
                                    </div>
                                    <PasswordInput
                                        id="password"
                                        label="Password"
                                        value={data.password}
                                        onChange={(e) =>
                                            setData('password', e.target.value)
                                        }
                                        required
                                        error={errors.password}
                                    />
                                    <PasswordInput
                                        id="password_confirmation"
                                        label="Confirm Password"
                                        value={data.password_confirmation}
                                        onChange={(e) =>
                                            setData(
                                                'password_confirmation',
                                                e.target.value,
                                            )
                                        }
                                        required
                                        error={errors.password_confirmation}
                                    />
                                </>
                            )}

                            {registerType === 'clinic' && (
                                <div className="grid gap-4 sm:grid-cols-2">
                                    <div className="sm:col-span-2">
                                        <Label htmlFor="clinic_name">
                                            Clinic Name
                                        </Label>
                                        <Input
                                            id="clinic_name"
                                            value={data.clinic_name}
                                            onChange={(e) =>
                                                setData(
                                                    'clinic_name',
                                                    e.target.value,
                                                )
                                            }
                                            required
                                        />
                                        <InputError
                                            message={errors.clinic_name}
                                        />
                                    </div>
                                    <div className="sm:col-span-2">
                                        <Label htmlFor="address">Address</Label>
                                        <Input
                                            id="address"
                                            value={data.address}
                                            onChange={(e) =>
                                                setData(
                                                    'address',
                                                    e.target.value,
                                                )
                                            }
                                            required
                                        />
                                        <InputError message={errors.address} />
                                    </div>
                                    <div>
                                        <Label htmlFor="city">City</Label>
                                        <Input
                                            id="city"
                                            value={data.city}
                                            onChange={(e) =>
                                                setData('city', e.target.value)
                                            }
                                            required
                                        />
                                        <InputError message={errors.city} />
                                    </div>
                                    <div>
                                        <Label htmlFor="state">State</Label>
                                        <Input
                                            id="state"
                                            value={data.state}
                                            onChange={(e) =>
                                                setData('state', e.target.value)
                                            }
                                            required
                                        />
                                        <InputError message={errors.state} />
                                    </div>
                                    <div>
                                        <Label htmlFor="country">Country</Label>
                                        <CountryDropdown
                                            placeholder="Country"
                                            defaultValue="NGA"
                                            onChange={(country) => {
                                                setData(
                                                    'country',
                                                    country.name,
                                                );
                                            }}
                                        />
                                        <InputError message={errors.country} />
                                    </div>
                                    <div>
                                        <Label htmlFor="phone">Phone</Label>
                                        <Input
                                            id="phone"
                                            value={data.phone}
                                            onChange={(e) =>
                                                setData('phone', e.target.value)
                                            }
                                            required
                                        />
                                        <InputError message={errors.phone} />
                                    </div>
                                    <div>
                                        <Label htmlFor="email">Email</Label>
                                        <Input
                                            id="email"
                                            value={data.email}
                                            onChange={(e) =>
                                                setData('email', e.target.value)
                                            }
                                            required
                                        />
                                        <InputError message={errors.email} />
                                    </div>
                                    <div>
                                        <Label htmlFor="working_days">
                                            Working Days
                                        </Label>
                                        <select
                                            id="working_days"
                                            value={data.working_days}
                                            onChange={(e) =>
                                                setData(
                                                    'working_days',
                                                    e.target.value,
                                                )
                                            }
                                            className="w-full rounded border-gray-300"
                                        >
                                            <option value="">Select...</option>
                                            <option value="24/7">24/7</option>
                                            <option value="Monday-Saturday">
                                                Monday - Saturday
                                            </option>
                                            <option value="Monday-Friday">
                                                Monday - Friday
                                            </option>
                                            <option value="Custom">
                                                Custom
                                            </option>
                                        </select>
                                        <InputError
                                            message={errors.working_days}
                                        />
                                    </div>
                                    <div>
                                        <Label htmlFor="working_hours">
                                            Working Hours
                                        </Label>
                                        <input
                                            id="working_hours"
                                            type="time"
                                            value={data.working_hours}
                                            onChange={(e) =>
                                                setData(
                                                    'working_hours',
                                                    e.target.value,
                                                )
                                            }
                                            className="w-full rounded border-gray-300"
                                        />
                                        <InputError
                                            message={errors.working_hours}
                                        />
                                    </div>
                                    <PasswordInput
                                        label="Password"
                                        id="password"
                                        value={data.password}
                                        onChange={(e) =>
                                            setData('password', e.target.value)
                                        }
                                        required
                                        error={errors.password}
                                    />
                                    <PasswordInput
                                        label="Confirm Password"
                                        id="password_confirmation"
                                        value={data.password_confirmation}
                                        onChange={(e) =>
                                            setData(
                                                'password_confirmation',
                                                e.target.value,
                                            )
                                        }
                                        required
                                        error={errors.password_confirmation}
                                    />
                                    <div className="col-span-2 space-y-4">
                                        <LocationPicker
                                            lat={data.lat}
                                            lng={data.lng}
                                            onChange={({ lat, lng }) => {
                                                setData('lat', lat);
                                                setData('lng', lng);
                                            }}
                                        />
                                    </div>
                                </div>
                            )}

                            <Button
                                type="submit"
                                className="mt-2 w-full bg-violet-700 text-white hover:bg-violet-800"
                            >
                                {processing && (
                                    <LoaderCircle className="h-4 w-4 animate-spin" />
                                )}
                                Create account
                            </Button>
                        </div>

                        <div className="text-center text-sm text-muted-foreground">
                            Already have an account?{' '}
                            <TextLink className="text-gray-600" href={login()}>
                                Log in
                            </TextLink>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
