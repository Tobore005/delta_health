<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Models\Appointment;
use App\Models\Clinic;
use App\Models\User;
use App\Notifications\AppointmentCreated;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class UserAppointmentController extends Controller
{
    public function index()
    {
        $user = Auth::guard('web')->user();

        $appointments = Appointment::where('user_id', $user->id)
            ->with('clinic')
            ->latest()
            ->get();

        $clinics = Clinic::where('is_approved', true)
            ->select('id', 'name')
            ->get();

        return Inertia::render('dashboard/user/appointments', [
            'appointments' => $appointments,
            'clinics' => $clinics,
        ]);
    }

    public function store(Request $request)
    {
        $user = Auth::guard('web')->user();

        $validated = $request->validate([
            'clinic_id' => 'required|exists:clinics,id',
            'service' => 'required|string|max:255',
            'date' => 'required|date',
            'time' => 'required',
        ]);

        // Attach current user
        $validated['user_id'] = $user->id;

        $appointment = Appointment::create($validated);

        $clinic = Clinic::find($validated['clinic_id']);
        $clinic->notify(new AppointmentCreated($appointment));
        return back()->with('success', 'Appointment booked successfully!');
    }
}
