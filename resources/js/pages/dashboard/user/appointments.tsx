import AppLayout from '@/layouts/app-layout';
import { Head, useForm, usePage } from '@inertiajs/react';
import { BreadcrumbItem } from '@/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useState } from 'react';
import { Calendar } from '@/components/ui/calendar';
import { Textarea } from '@/components/ui/textarea';

const breadcrumbs: BreadcrumbItem[] = [
  { title: 'Dashboard', href: '/dashboard/user' },
  { title: 'Appointments', href: '/dashboard/user/appointments' },
];

export default function Appointments() {
  type Appointment = {
    id: number;
    service: string;
    clinic?: { id: number; name: string };
    date: string;
    time: string;
    status: string;
  };
  
  type Clinic = {
    id: number;
    name: string;
  };
  
  type PageProps = {
    appointments: Appointment[];
    clinics: Clinic[];
  };
  
    const { appointments, clinics } = usePage<PageProps>().props;
  const [date, setDate] = useState<Date | undefined>(new Date());

  const { data, setData, post, processing, errors, reset } = useForm({
    clinic_id: '',
    service: '',
    date: '',
    time: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    post('/dashboard/user/appointments', {
      onSuccess: () => reset(),
    });
  };

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Appointment Booking" />
      <div className="p-6 space-y-6">
        <h2 className="text-xl font-semibold">Book an Appointment</h2>

        <form onSubmit={handleSubmit} className="grid gap-4">
          <Select onValueChange={(val) => setData('clinic_id', val)}>
            <SelectTrigger>
              <SelectValue placeholder="Select Clinic" />
            </SelectTrigger>
            <SelectContent>
              {clinics?.map((clinic: Clinic) => (
                <SelectItem key={clinic.id} value={clinic.id.toString()}>
                  {clinic.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.clinic_id && <p className="text-red-500 text-sm">{errors.clinic_id}</p>}

          <Textarea
            placeholder="Enter Symptoms"
            value={data.service}
            onChange={(e) => setData('service', e.target.value)}
          />
          {errors.service && <p className="text-red-500 text-sm">{errors.service}</p>}

          <Calendar
            mode="single"
            selected={date}
            onSelect={(selected) => {
              setDate(selected);
              setData('date', selected?.toISOString().split('T')[0] || '');
            }}
          />
          {errors.date && <p className="text-red-500 text-sm">{errors.date}</p>}

          <Input
            type="time"
            value={data.time}
            onChange={(e) => setData('time', e.target.value)}
          />
          {errors.time && <p className="text-red-500 text-sm">{errors.time}</p>}

          <Button type="submit" disabled={processing}>
            {processing ? 'Booking...' : 'Book Appointment'}
          </Button>
        </form>
      </div>
      <div className="p-6 space-y-6">
        <div className="mt-10">
          <h3 className="font-semibold mb-3">Appointments</h3>
          <ul className="space-y-2">
            {appointments?.length ? (
              appointments.map((a: Appointment) => (
                <li key={a.id} className="border rounded-md p-3 flex justify-between">
                  <span>{a.service}</span>
                  <span>{a.clinic?.name}</span>
                  <span className="text-sm text-gray-600">{a.date}</span>
                  <span className="text-sm text-gray-600">{a.time}</span>
                  <span className="text-sm text-gray-600 capitalize">{a.status}</span>
                </li>
              ))
            ) : (
              <p className="text-gray-500">No appointments yet.</p>
            )}
          </ul>
        </div>
      </div>
    </AppLayout>
  );
}
