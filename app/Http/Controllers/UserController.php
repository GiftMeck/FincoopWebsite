<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class UserController extends Controller
{
    public function index(Request $request)
    {
        $ActionSource = $request->query('ActionSource', 'public');
        if($ActionSource === 'finprivate'){
            return Inertia::render('staff/Index', 
            [
            'ActionSource' => $ActionSource,
            'roles' => \App\Models\Role::all(),
            'users' => \App\Models\User::all(),
            'branches' => \App\Models\Branch::all(),
            ]);
        }
        return Inertia::render('staff/StaffPublic', 
            [
            'ActionSource' => $ActionSource,
            ]);
    }
    public function create(Request $request){
        $ActionSource = $request->query('ActionSource', 'public');
        $roles = \App\Models\Role::all();
        $branches = \App\Models\Branch::all();
        return Inertia::render('staff/Create', 
        [
            'roles' => $roles,
            'branches' => $branches,
            'ActionSource' => $ActionSource,
        ]);
    }
    public function store(Request $request){
        $validatedData = $request->validate(
            [
                'name' => 'required|string',
                'email' => 'required|email',
                'password' => 'required|string',
                'branch_id' => 'nullable',
                'role' => 'nullable',
                'profile_picture' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:10240'
            ]
            );
            if($request->hasFile('profile_picture')){
                $imagePath = $request->file('profile_picture')->store('profile_pictures', 'public');
                $validatedData['profile_picture'] = $imagePath; 
            }
            \App\Models\User::create($validatedData);
            return Inertia::render('staff/Index',
                [
                    'ActionSource' => $request->query('ActionSource', 'public'),
                    'users' => \App\Models\User::all()
                ] 
            );
    }
    public function update(Request $request){
        $validatedData = $request->validate(
            [
                'name' => 'required|string',
                'email' => 'required|email',
                'password' => 'required|string',
                'branch_id' => 'nullable',
                'role' => 'nullable',
                'profile_picture' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:10240'
            ]
            );
            if($request->hasFile('profile_picture')){
                $imagePath = $request->file('profile_picture')->store('profile_pictures', 'public');
                $validatedData['profile_picture'] = $imagePath; 
            }
            \App\Models\User::findOrFail($request->staff_id)->update($validatedData);
            return redirect()->route('dashboard')->with(
                [
                    'success' => 'Staff updated successfully',
                    'activeTab' => 'STAFF'
                ]
            );
    }
}
