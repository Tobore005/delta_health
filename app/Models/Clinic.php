<?php

namespace App\Models;

use App\Notifications\ClinicResetPasswordNotification;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class Clinic extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    protected $fillable = [
        'name',
        'email',
        'password',
        'phone',
        'address',
        'city',
        'state',
        'country',
        'description',
        'working_hours',
        'lat',
        'lng',
        'is_approved',
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected $casts = [
        'is_approved' => 'boolean',
    ];

    public function sendPasswordResetNotification($token)
    {
        $this->notify(new ClinicResetPasswordNotification($token));
    }

    // Optional relationship to appointments
    public function appointments()
    {
        return $this->hasMany(Appointment::class);
    }
}
