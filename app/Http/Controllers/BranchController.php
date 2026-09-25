<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class BranchController extends Controller
{
    public function index(Request $request)
    {
        $ActionSource = $request->query('ActionSource', 'public');
        return Inertia::render('branches/BranchesPublic', ['ActionSource' => $ActionSource]);
    }

    public function store(Request $request){
        $validatedData = $request->validate(
            [
                'branch_name' => 'required|string',
                'branch_address' => 'nullable|string',
                'branch_phone' => 'required|string',
                'branch_email' => 'nullable|email|unique:branches',
                'social_media_links' => 'nullable|string'
            ]
            );
            \App\Models\branch::create($validatedData);
            return Inertia::render('branches/Index',
            [
                'message' => 'Branch created successfully',
                'ActionSource' => $request->query('ActionSource', 'public'),
                'branches' => \App\Models\branch::all()
            ]
        );
    }
}
