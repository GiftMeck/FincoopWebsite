<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;

class ServiceController extends Controller
{
    public function index(Request $request)
    {
        $ActionSource = $request->query('ActionSource', 'public');
        if($ActionSource === 'finprivate'){
            return Inertia::render('services/Index', ['ActionSource' => $ActionSource]);
        }
        return Inertia::render('services/ServicesPublic', 
            [
                'serviceCategories' => \App\Models\serviceCategory::with('services')->get(),
            ]
        );
    }
    public function create(Request $request){
        $ActionSource = $request->query('ActionSource', 'public');
        $branches = \App\Models\Branch::all();
        $serviceCategories = \App\Models\ServiceCategory::all();
        return Inertia::render('services/Create', 
        [
            'serviceCategories' => $serviceCategories,
            'branches' => $branches,
            'ActionSource' => $ActionSource
        ]);
    }
    public function store(Request $request){
        $validatedData = $request->validate(
            [
                'service_name' => 'required|string',
                'service_description' => 'required|string',
                'category_id' => 'nullable',
                'branch_id' => 'nullable',
                'service_image' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:10240'
            ]
            );
        if ($request->hasFile('service_image')) {
            $imagePath = $request->file('service_image')->store('service_images', 'public');
            $validatedData['service_image'] = $imagePath;
            }
        \App\Models\service::create($validatedData);
        return Inertia::render('services/ServicesDashboard',
                [
                    'success' => 'Service created successfully',
                    'ActionSource' => $request->query('ActionSource', 'public')
                ]
            );
    }
    public function show(Request $request){
        return Inertia::render('services/Show',
        [
            'service' => \App\Models\service::findOrFail($request->service_id)
        ]
        );
    }
    public function edit(Request $request){
        return Inertia::render('Dashboard', 
        [
            'service' => \App\Models\service::findOrFail($request->service_id),
            'activeTab' => 'SERVICES'
        ]
        );
    }
    public function update(Request $request)
    {
        $validatedData = $request->validate([
            'service_name' => 'required|string',
            'service_description' => 'required|string',
            'category_id' => 'required',
            'branch_id' => 'required',
            'service_image' => 'nullable|image',
        ]);

        if ($request->hasFile('service_image')) {
            $imagePath = $request
                ->file('service_image')
                ->store('service_images', 'public');

            $validatedData['service_image'] = $imagePath;
        }

        \App\Models\Service::findOrFail(
            $request->service_id
        )->update($validatedData);

        return redirect()
            ->route('dashboard')
            ->with([
                'success' => 'Service updated successfully.',
                'activeTab' => 'SERVICES',
            ]);
    }
}
