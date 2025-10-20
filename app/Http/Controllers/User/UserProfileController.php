<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class UserProfileController extends Controller
{
    public function index()
    {
        $user = Auth::guard('web')->user();

        return Inertia::render('dashboard/user/profile', [
            'user' => $user,
        ]);
    }

    public function update(Request $request)
    {
        $user = Auth::guard('web')->user();

        $validated = $request->validate([
            'firstname' => 'required|string|max:255',
            'lastname' => 'required|string|max:255',
            'phone' => 'nullable|string|max:20',
            'email' => 'required|string|lowercase|email|max:255|unique:users,email',
        ]);

        // Concatenate first and last name
        $validated['name'] = $validated['firstname'] . ' ' . $validated['lastname'];

        $user->update($validated);

        return back()->with('success', 'Profile updated successfully.');
    }

}
