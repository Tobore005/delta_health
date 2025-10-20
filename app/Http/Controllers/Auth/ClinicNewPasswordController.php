<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Auth\Events\PasswordReset;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Password;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\RedirectResponse;

class ClinicNewPasswordController extends Controller
{
    /**
     * Display the password reset view.
     */
    public function create(Request $request): Response
    {
        return Inertia::render('auth/clinic-reset-password', [
            'email' => $request->query('email'),
            'token' => $request->route('token'),
        ]);
    }

    /**
     * Handle the new password submission.
     */
    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'token' => 'required',
            'email' => 'required|email',
            'password' => ['required', 'min:8', 'confirmed'],
        ]);

        // Use the CLINIC broker here
        $status = Password::broker('clinics')->reset(
            $request->only('email', 'password', 'password_confirmation', 'token'),
            function ($clinic) use ($request) {
                $clinic->forceFill([
                    'password' => Hash::make($request->password),
                    'remember_token' => Str::random(60),
                ])->save();

                event(new PasswordReset($clinic));
            }
        );

        return $status === Password::PASSWORD_RESET
            ? redirect()->route('clinic.login')->with('status', __($status))
            : back()->withErrors(['email' => __($status)]);
    }
}
