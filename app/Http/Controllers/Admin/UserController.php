<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use Inertia\Inertia;

class UserController extends Controller
{
    public function index()
    {
        $users = User::all();

        return Inertia::render('dashboard/admin/users', [
            'users' => $users,
        ]);
    }

    public function show(User $user)
    {
        return Inertia::render('dashboard/admin/user-details', [
            'user' => $user->load(['appointments', 'appointments.clinic']),
        ]);
    }

    // public function approve($id)
    // {
    //     $clinic = User::findOrFail($id);
    //     $clinic->is_approved = true;
    //     $clinic->save();

    //     return redirect()->back()->with('success', 'User approved successfully!');
    // }

    // public function unapprove($id)
    // {
    //     $clinic = User::findOrFail($id);
    //     $clinic->is_approved = true;
    //     $clinic->save();

    //     return redirect()->back()->with('success', 'User unapproved successfully!');
    // }
}
