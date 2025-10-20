<?php

namespace App\Helpers;

use Illuminate\Support\Facades\Auth;

class AuthHelper
{
    public static function logoutOtherGuards(string $currentGuard)
    {
        $guards = ['admin', 'clinic', 'web']; // all your guards here

        foreach ($guards as $guard) {
            if ($guard !== $currentGuard && Auth::guard($guard)->check()) {
                Auth::guard($guard)->logout();
            }
        }
    }
}
