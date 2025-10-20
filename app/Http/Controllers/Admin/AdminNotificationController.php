<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;

class AdminNotificationController extends Controller
{
    public function index()
    {
        $user = Auth::guard('admin')->user();

        return inertia('dashboard/admin/notifications', [
            'notifications' => $user->notifications()->latest()->get(),
        ]);
    }

    public function markAsRead($id)
    {
        $user = Auth::guard('admin')->user();
        $notification = $user->notifications()->findOrFail($id);
        $notification->markAsRead();

        return back();
    }
}
