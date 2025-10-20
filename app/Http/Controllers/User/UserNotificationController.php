<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;

class UserNotificationController extends Controller
{
    public function index()
    {
        $user = Auth::guard('web')->user();

        return inertia('dashboard/user/notifications', [
            'notifications' => $user->notifications()->latest()->get(),
        ]);
    }

    public function markAsRead($id)
    {
        $user = Auth::guard('web')->user();
        $notification = $user->notifications()->findOrFail($id);
        $notification->markAsRead();

        return back();
    }
}
