<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class PartnerController extends Controller
{
    public function index(Request $request)
    {
        $ActionSource = $request->query('ActionSource', 'public');
        if($ActionSource === 'finprivate'){
            return Inertia::render('partners/Index', ['ActionSource' => $ActionSource]);
        }
        return Inertia::render('partners/PartnersPublic', 
            [
                'ActionSource' => $ActionSource,
                'partners' => \App\Models\Partner::all(),
            ]
        );
    }

    public function create(Request $request)
    {
        $ActionSource = $request->query('ActionSource', 'public');
        return Inertia::render('partners/Create', ['ActionSource' => $ActionSource]);
    }
    public function store(Request $request){
        $validatedData = $request->validate(
            [
                'partner_name' => 'required|string',
                'partner_logo' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
                'partner_description' => 'required|string'
            ]
            );
            if ($request->hasFile('partner_logo')) {
            $imagePath = $request->file('partner_logo')->store('partner_logos', 'public');
            $validatedData['partner_logo'] = $imagePath;
            }
            \App\Models\partner::create($validatedData);
            return Inertia::render('partners/Index',
            [
                'message' => 'Partner created successfully',
                'partners' => \App\Models\partner::all(),
                'ActionSource' => $request->query('ActionSource', 'public')
            ]
        );
    }
    public function show(Request $request){
        return Inertia::render('partners/Show', ['partner' => \App\Models\partner::findOrFail($request->partner_id)]);
    }
}
