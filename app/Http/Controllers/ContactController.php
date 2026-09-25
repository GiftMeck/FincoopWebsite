<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class ContactController extends Controller
{
    public function index(Request $request)
    {
        $ActionSource = $request->query('ActionSource', 'public');
        return Inertia::render('contact/ContactPublic', ['ActionSource' => $ActionSource]);
    }
    public function store(Request $request){
        $validatedData = $request->validate(
            [
                'contact_number' => 'required',
                'contact_email' => 'required|email|unique',
                'contact_physical_address' => 'nullable|string',
                'branch_id' => 'nullable|branches:branch_id',
                'partner_id' => 'nullable|partners:partner_id'
            ]
            );
        \App\Models\contact::create($validatedData);
        return redirect()->back()->with('message', 'Contact created successfully');
    }
}
