<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\HealthArticle;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AdminHealthInfoController extends Controller
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

        return Inertia::render('dashboard/admin/articles', [
            'articles' => $articles,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'category' => 'nullable|string|max:255',
            'content' => 'required|string',
        ]);

        HealthArticle::create($validated);

        return back()->with('success', 'Article created successfully.');
    }
}
