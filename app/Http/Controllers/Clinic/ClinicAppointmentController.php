<?php

namespace App\Http\Controllers\Clinic;

use App\Http\Controllers\Controller;
use App\Models\Admin;
use App\Models\Appointment;
use App\Models\Clinic;
use App\Notifications\AppointmentCompleted;
use App\Notifications\AppointmentConfirmed;
use App\Notifications\AppointmentRejected;
use App\Notifications\AppointmentRescheduled;
use App\Notifications\AppointmentRestored;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class ClinicAppointmentController extends Controller
{
    public function index()
    {
        $clinic = Auth::guard('clinic')->user();

        $appointments = Appointment::where('clinic_id', $clinic->id)
            ->with('user')
            ->latest()
            ->get();

        $clinics = Clinic::select('id', 'name')->get();

        return Inertia::render('dashboard/clinic/appointments', [
            'appointments' => $appointments,
            'clinics' => $clinics,
        ]);
    }

    public function store(Request $request)
    {
        $clinic = Auth::guard('clinic')->user();

        $validated = $request->validate([
            'clinic_id' => 'required|exists:clinics,id',
            'service' => 'required|string|max:255',
            'date' => 'required|date',
            'time' => 'required',
        ]);

        $validated['user_id'] = Auth::id();
        $validated['clinic_id'] = $clinic->id;

        Appointment::create($validated);

        return back()->with('success', 'Appointment booked successfully!');
    }

    public function reschedule(Request $request, $id)
{
    $clinic = Auth::guard('clinic')->user();
    $appointment = Appointment::findOrFail($id);

    // Ensure the appointment belongs to this clinic
    if ($appointment->clinic_id !== $clinic->id) {
        abort(403, 'Unauthorized action.');
    }

    // Validate new date and time
    $validated = $request->validate([
        'date' => 'required|date|after_or_equal:today',
        'time' => 'required|string',
        'notes' => 'nullable|string|max:500',
    ]);

    // Update appointment
    $appointment->update([
        'date' => $validated['date'],
        'time' => $validated['time'],
        'notes' => $validated['notes'] ?? $appointment->notes,
        'status' => 'rescheduled', // optional: mark status
    ]);

    // Notify user and admins
    $appointment->user->notify(new AppointmentRescheduled($appointment));

    $admins = Admin::all();
    foreach ($admins as $admin) {
        $admin->notify(new AppointmentRescheduled($appointment));
    }

    return back()->with('success', 'Appointment rescheduled successfully.');
}

    public function approve($id)
    {
        $clinic = Auth::guard('clinic')->user();
        $appointment = Appointment::findOrFail($id);

        // Ensure the appointment belongs to this clinic
        if ($appointment->clinic_id !== $clinic->id) abort(403);

        $appointment->status = 'confirmed';
        $appointment->save();

        // Send notification to the user
        $appointment->user->notify(new AppointmentConfirmed($appointment));
        $admins = Admin::all();
        foreach ($admins as $admin) {
            $admin->notify(new AppointmentConfirmed($appointment));
        }
        return back()->with('success', 'Appointment Confirmed successfully.');
    }

    public function reject($id) {
        $clinic = Auth::guard('clinic')->user();
        $appointment = Appointment::findOrFail($id);

        if ($appointment->clinic_id !== $clinic->id) abort(403);

        $appointment->status = 'cancelled';
        $appointment->save();

        // Send notification to the user
        $appointment->user->notify(new AppointmentRejected($appointment));
        $admins = Admin::all();
        foreach ($admins as $admin) {
            $admin->notify(new AppointmentRejected($appointment));
        }
        return back()->with('success', 'Appointment rejected.');
    }

    public function complete($id) {
        $clinic = Auth::guard('clinic')->user();
        $appointment = Appointment::findOrFail($id);

        if ($appointment->clinic_id !== $clinic->id) abort(403);

        $appointment->status = 'completed';
        $appointment->save();

        // Send notification to the user
        $appointment->user->notify(new AppointmentCompleted($appointment));
        $admins = Admin::all();
        foreach ($admins as $admin) {
            $admin->notify(new AppointmentCompleted($appointment));
        }
        return back()->with('success', 'Appointment marked as completed.');
    }

    public function activate($id)
    {
        $clinic = Auth::guard('clinic')->user();
        $appointment = Appointment::findOrFail($id);

        if ($appointment->clinic_id !== $clinic->id) abort(403);

        $appointment->status = 'pending';
        $appointment->save();

        // Send notification to the user
        $appointment->user->notify(new AppointmentRestored($appointment));
        $admins = Admin::all();
        foreach ($admins as $admin) {
            $admin->notify(new AppointmentRestored($appointment));
        }
        return back()->with('success', 'Appointment restored.');
    }
}
