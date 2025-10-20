<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class AdminProfileController extends Controller
{
    public function index()
    {
        $admin = Auth::guard('admin')->user();

        return Inertia::render('dashboard/admin/profile', [
            'admin' => $admin,
        ]);
    }

    public function update(Request $request)
    {
        $admin = Auth::guard('admin')->user();

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'phone' => 'nullable|string|max:20',
            'email' => 'required|string|lowercase|email|max:255|unique:users,email',
        ]);

        $admin->update($validated);

        return back()->with('success', 'Profile updated successfully.');
    }

}
