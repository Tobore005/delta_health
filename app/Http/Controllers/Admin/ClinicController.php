<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Clinic;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ClinicController extends Controller
{
    public function index()
    {
        $clinics = Clinic::all();

        return Inertia::render('dashboard/admin/clinics', [
            'clinics' => $clinics,
        ]);
    }

    public function show(Clinic $clinic)
    {
        return Inertia::render('dashboard/admin/clinic-details', [
            'clinic' => $clinic->load(['appointments', 'appointments.user']),
            
        ]);
    }

    public function approve($id)
    {
        $clinic = Clinic::findOrFail($id);
        $clinic->is_approved = true;
        $clinic->save();

        return redirect()->back()->with('success', 'Clinic approved successfully!');
    }

    public function unapprove($id)
    {
        $clinic = Clinic::findOrFail($id);
        $clinic->is_approved = false;
        $clinic->save();

        return redirect()->back()->with('success', 'Clinic unapproved successfully!');
    }
}
