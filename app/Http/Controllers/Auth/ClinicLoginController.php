<?php

namespace App\Http\Controllers\Auth;

use App\Helpers\AuthHelper;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class ClinicLoginController extends Controller
{
    /**
     * Show the login form for clinics.
     */
    public function showLoginForm()
    {
        return Inertia::render('auth/clinic-login'); // or return view('clinic.login') if using Blade
    }

    /**
     * Handle a clinic login request.
     */
    public function login(Request $request)
    {
        $request->validate([
            'email'    => ['required', 'email'],
            'password' => ['required'],
        ]);

        // attempt login using the 'clinic' guard
        if (Auth::guard('clinic')->attempt($request->only('email', 'password'), $request->boolean('remember'))) {
            // ✅ Log out other guards
            AuthHelper::logoutOtherGuards('clinic');

            $request->session()->regenerate();

            return redirect()->intended(route('clinic.dashboard'));
        }

        return back()->withErrors([
            'email' => 'Invalid credentials provided.',
        ])->onlyInput('email');
    }

    /**
     * Log the clinic out and invalidate the session.
     */
    public function logout(Request $request)
    {
        Auth::guard('clinic')->logout();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return redirect('/clinic-login');
    }
}