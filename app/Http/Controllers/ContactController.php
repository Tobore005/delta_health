<?php

namespace App\Http\Controllers;

use App\Models\Clinic;
use Inertia\Inertia;

class ContactController extends Controller
{
    public function index()
    {
        // Fetch all clinics from the database
        $clinics = Clinic::select('id', 'name', 'address', 'lat', 'lng')->get();

        // Render the Inertia page and pass clinics as props
        return Inertia::render('contact', [
            'clinics' => $clinics,
        ]);
    }
}