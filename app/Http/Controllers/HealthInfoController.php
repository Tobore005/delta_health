<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\HealthArticle;
use Illuminate\Http\Request;
use Inertia\Inertia;

class HealthInfoController extends Controller
{
    public function index(Request $request)
    {
        $query = HealthArticle::query();

        // Optional search
        if ($search = $request->get('search')) {
            $query->where('title', 'like', "%$search%")
                  ->orWhere('category', 'like', "%$search%");
        }

        $articles = $query->latest()->get();

        return Inertia::render('dashboard/health-info', [
            'articles' => $articles,
        ]);
    }
}
