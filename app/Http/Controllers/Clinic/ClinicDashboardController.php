<?php

namespace App\Http\Controllers\Clinic;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class ClinicDashboardController extends Controller
{
    public function index()
    {
        $clinic = Auth::guard('clinic')->user();

        return Inertia::render('dashboard/clinic/index', [
            'appointments' => $clinic->appointments()->with('user')->latest()->get(),
            'stats' => [
                'appointments' => $clinic->appointments()->count(),
                'pending' => $clinic->appointments()->where('status', 'pending')->count(),
                'approved' => $clinic->appointments()->where('status', 'approved')->count(),
            ],
        ]);
    }
}
