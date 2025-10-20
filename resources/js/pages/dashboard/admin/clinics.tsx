import AppLayout from '@/layouts/app-layout';
import { Head, Link, usePage } from '@inertiajs/react';
import { BreadcrumbItem } from '@/types';
import { Input } from '@/components/ui/input';
// import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useMemo, useState } from 'react';
import { Button } from '@/components/ui/button';

const breadcrumbs: BreadcrumbItem[] = [
  { title: 'Dashboard', href: '/dashboard/admin' },
  { title: 'Clinics', href: '/dashboard/admin/clinics' },
];

interface Clinic {
  id: number;
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  country: string;
  description: string;
  working_hours: string;
  lat: number;
  lng: number;
  is_approved: boolean;
}

interface ClinicsPageProps {
  clinics: Clinic[];
}

export default function Clinics() {
  const { clinics } = usePage().props as unknown as ClinicsPageProps;
  const [search, setSearch] = useState('');

  const filteredClinics = useMemo(() => {
    const term = search.toLowerCase();
    return clinics.filter(
      (c) =>
        c.name?.toLowerCase().includes(term) ||
        c.city?.toLowerCase().includes(term) ||
        c.state?.toLowerCase().includes(term) ||
        c.email?.toLowerCase().includes(term) ||
        c.phone?.toLowerCase().includes(term)
    );
  }, [clinics, search]);

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Clinics" />
      <div className="p-6 space-y-6">
        <div className="flex justify-between items-center">
          <Input
            placeholder="Search clinics..."
            // className="max-w-md"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          {/* <Button variant="secondary">Filter</Button> */}
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>S/N</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Address</TableHead>
              <TableHead>City</TableHead>
              <TableHead>State</TableHead>
              <TableHead>Country</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Working Hours</TableHead>
              <TableHead>Latitude</TableHead>
              <TableHead>Longitude</TableHead>
              <TableHead>Approved?</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredClinics.length > 0 ? (
              filteredClinics.map((clinic, i) => (
                <TableRow key={i}>
                  <TableCell>{i + 1}</TableCell>
                  <TableCell>{clinic.name}</TableCell>
                  <TableCell>{clinic.email}</TableCell>
                  <TableCell>{clinic.phone}</TableCell>
                  <TableCell>{clinic.address}</TableCell>
                  <TableCell>{clinic.city}</TableCell>
                  <TableCell>{clinic.state}</TableCell>
                  <TableCell>{clinic.country}</TableCell>
                  <TableCell>{clinic.description}</TableCell>
                  <TableCell>{clinic.working_hours}</TableCell>
                  <TableCell>{clinic.lat}</TableCell>
                  <TableCell>{clinic.lng}</TableCell>
                  <TableCell>
                    {clinic.is_approved ? (
                      <span className="text-green-600 font-semibold">Yes</span>
                    ) : (
                      <span className="text-red-600 font-semibold">No</span>
                    )}
                  </TableCell>
                  <TableCell>
                    <Link href={`/dashboard/admin/clinics/${clinic.id}`}>
                      <Button size="sm" variant="outline">View</Button>
                    </Link>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={12} className="text-center py-4 text-gray-500">
                  No clinics found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </AppLayout>
  );
}
