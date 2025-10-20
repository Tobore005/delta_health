<?php

namespace App\Http\Controllers\Clinic;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class ClinicProfileController extends Controller
{
    public function index()
    {
        $clinic = Auth::guard('clinic')->user();

        return Inertia::render('dashboard/clinic/profile', [
            'clinic' => $clinic,
        ]);
    }

    public function update(Request $request)
    {
        $clinic = Auth::guard('clinic')->user();

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'phone' => 'nullable|string|max:20',
            'address' => 'nullable|string|max:255',
            'description' => 'nullable|string',
            'working_hours' => 'nullable|string|max:255',
            'lat' => 'nullable|numeric',
            'lng' => 'nullable|numeric',
        ]);

        $clinic->update($validated);

        return back()->with('success', 'Profile updated successfully.');
    }
}
