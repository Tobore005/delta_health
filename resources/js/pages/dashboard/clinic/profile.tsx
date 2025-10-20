import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Head, useForm, usePage } from '@inertiajs/react';
import LocationPicker from '@/components/LocationPicker';

const breadcrumbs: BreadcrumbItem[] = [
  { title: 'Dashboard', href: '/dashboard/clinic' },
  { title: 'Profile', href: '/dashboard/clinic/profile' },
];

export default function Profile() {
  interface PageProps {
    clinic: {
      name: string;
      email: string;
      phone: string;
      description: string;
      working_hours: string;
      lat: number | null;
      lng: number | null;
    };
    [key: string]: unknown;
  }

  const { clinic } = usePage<PageProps>().props;

  const { data, setData, put, processing, errors } = useForm({
    name: clinic.name || '',
    email: clinic.email || '',
    phone: clinic.phone || '',
    working_hours: clinic.working_hours || '',
    lat: clinic.lat || null,
    lng: clinic.lng || null,
  });

  // ✅ Handle profile update
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!data.lat || !data.lng) {
      alert('Please detect or set your clinic location.');
      return;
    }
    put('/dashboard/clinic/profile');
  };

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Profile" />
      <div className="max-w-2xl space-y-6 p-6">
        <h2 className="text-xl font-semibold">Profile Information</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            placeholder="Full Name"
            value={data.name}
            onChange={(e) => setData('name', e.target.value)}
          />
          {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}

          <Input
            placeholder="Email Address"
            type="email"
            value={data.email}
            onChange={(e) => setData('email', e.target.value)}
          />
          {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}

          <Input
            placeholder="Phone Number"
            type="tel"
            value={data.phone}
            onChange={(e) => setData('phone', e.target.value)}
          />
          {errors.phone && <p className="text-sm text-red-500">{errors.phone}</p>}

          <Input
            placeholder="Working Hours"
            id="working_hours"
            type="time"
            value={data.working_hours}
            onChange={(e) => setData('working_hours', e.target.value)}
            className="w-full rounded border-gray-300"
          />
          {errors.working_hours && (
            <p className="text-sm text-red-500">{errors.working_hours}</p>
          )}

          {/* 🗺️ Map + Detect Location */}
            <LocationPicker
                lat={clinic.lat}
                lng={clinic.lng}
                onChange={({ lat, lng }) => {
                    setData('lat', lat);
                    setData('lng', lng);
                }}
            />

          <Button type="submit" disabled={processing}>
            {processing ? 'Saving...' : 'Save Changes'}
          </Button>
        </form>
      </div>
    </AppLayout>
  );
}
