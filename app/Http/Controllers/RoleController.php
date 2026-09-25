<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class RoleController extends Controller
{
    public function index(Request $request){
        $ActionSource = $request->query('ActionSource', 'public');
        if($ActionSource === 'finprivate'){
            return Inertia::render('roles/Index', ['ActionSource' => $ActionSource]);
        }
        return Inertia::render('roles/RolesPublic', ['ActionSource' => $ActionSource]);
    }
    public function create(Request $request){
        $ActionSource = $request->query('ActionSource', 'public');
        return Inertia::render('roles/Create', ['ActionSource' => $ActionSource]);
    }
    public function store(Request $request){
        $validatedData = $request->validate(
            [
                'role_name' => 'required|string|unique:roles',
            ]
            );
        \App\Models\role::create($validatedData);
        return Inertia::render('roles/Index', 
            [
                'message' => 'Role created successfully',
                'roles' => \App\Models\role::all(),
                'ActionSource' => $request->query('ActionSource', 'public')
            ]
        );
    }
    public function show(Request $request){

    }
    public function update(Request $request){

    }
    public function destroy(Request $request){

    }
    public function edit(Request $request){

    }
    public function search(Request $request){
    }
}
