<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\Clinic;
use App\Models\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Inertia\Inertia;
use Inertia\Response;

class RegisteredUserController extends Controller
{
    /**
     * Show the registration page.
     */
    public function create(): Response
    {
        return Inertia::render('auth/register');
    }

    /**
     * Handle an incoming registration request.
     */
    public function store(Request $request): RedirectResponse
    {
        if ($request->register_type === 'clinic') {
            $request->validate([
                'clinic_name' => 'required|string|max:255',
                'address' => 'required|string|max:255',
                'city' => 'required|string|max:255',
                'state' => 'required|string|max:255',
                'country' => 'required|string|max:255',
                'phone' => 'required|string|max:255',
                'email' => 'required|string|lowercase|email|max:255|unique:clinics,email',
                'working_hours' => 'nullable|string|max:255',
                'lat' => 'required|numeric',
                'lng' => 'required|numeric',
                'password' => ['required', 'confirmed', Rules\Password::defaults()],
            ]);

            $clinic = Clinic::create([
                'name' => $request->clinic_name,
                'address' => $request->address,
                'city' => $request->city,
                'state' => $request->state,
                'country' => $request->country,
                'phone' => $request->phone,
                'email' => $request->email,
                'working_hours' => $request->working_hours,
                'lat' => $request->lat,
                'lng' => $request->lng,
                'password' => Hash::make($request->password),
            ]);

            Auth::guard('clinic')->login($clinic);
            return redirect()->intended(route('clinic.dashboard', absolute: false));
        }

        // Normal user registration
        // Validation
        $validated = $request->validate([
            'firstname' => 'required|string|max:255',
            'lastname' => 'required|string|max:255',
            'email' => 'required|string|lowercase|email|max:255|unique:users,email',
            'phone' => 'required|string|max:255',
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
        ]);

        // Create user
        $user = User::create([
            'firstname' => $validated['firstname'],
            'lastname' => $validated['lastname'],
            'name' => $validated['firstname'] . ' ' . $validated['lastname'],
            'email' => $validated['email'],
            'phone' => $validated['phone'],
            'password' => Hash::make($validated['password']),
        ]);

        event(new Registered($user));
        Auth::login($user);

        return redirect()->intended(route('user.dashboard', absolute: false));
    }
}
