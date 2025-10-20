<?php

namespace App\Http\Controllers\Clinic;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ClinicNotificationController extends Controller
{
    public function index()
    {
        $clinic = Auth::guard('clinic')->user();

        return inertia('dashboard/clinic/notifications', [
            'notifications' => $clinic->notifications()->latest()->get(),
        ]);
    }

    public function markAsRead($id)
    {
        $clinic = Auth::guard('clinic')->user();
        $notification = $clinic->notifications()->findOrFail($id);
        $notification->markAsRead();

        return back();
    }
}
