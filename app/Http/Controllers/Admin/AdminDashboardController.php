<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Appointment;
use App\Models\Clinic;
use App\Models\User;
use Inertia\Inertia;

class AdminDashboardController extends Controller
{
    public function index()
    {
        $clinics = Clinic::select(
            'id',
            'name',
            'email',
            'password',
            'phone',
            'address',
            'city',
            'state',
            'country',
            'description',
            'working_hours',
            'is_approved',
            'created_at'
        )
            ->latest()
            ->get();

        return Inertia::render('dashboard/admin/index', [
            'stats' => [
                'users' => User::count(),
                'clinics' => Clinic::count(),
                'appointments' => Appointment::count(),
            ],
            'clinics' => $clinics,
        ]);
    }
}
