<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class UserDashboardController extends Controller
{
    public function index()
    {
        $user = Auth::guard('web')->user();

        return Inertia::render('dashboard/user/index', [
            'appointments' => $user->appointments()->with('clinic')->latest()->get(),
            'stats' => [
                'appointments' => $user->appointments()->count(),
                'pending' => $user->appointments()->where('status', 'pending')->count(),
                'approved' => $user->appointments()->where('status', 'approved')->count(),
            ],
        ]);
    }
}
