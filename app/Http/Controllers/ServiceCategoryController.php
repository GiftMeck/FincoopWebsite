<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\ServiceCategory;
use App\Models\serviceCategory as ModelsServiceCategory;
use Inertia\Inertia;

class ServiceCategoryController extends Controller
{
    private function getServiceCategories()
    {
        return ServiceCategory::all();
    }
    public function index(Request $request)
    {
        $ActionSource = $request->query('ActionSource', 'public');
            if($ActionSource === 'finprivate'){
                return Inertia::render('Dashboard', [

                'serviceCategories' => fn() => ServiceCategory::all()
            ]);
        }
        return Inertia::render('serviceCategories/ServiceCategoriesPublic', ['ActionSource' => $ActionSource]);
    }
    public function create(Request $request)
    {
        $ActionSource = $request->query('ActionSource', 'public');
        return Inertia::render('serviceCategories/Create', ['ActionSource' => $ActionSource]);
    }
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'category_name' => 'required|string|max:255',
            'category_description' => 'nullable|string',
            'category_image' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:10120',
        ]);
        if ($request->hasFile('category_image')) {
            $imagePath = $request->file('category_image')->store('service_categories', 'public');
            $validatedData['category_image'] = $imagePath;
        }
        ServiceCategory::create($validatedData);

        return Inertia::render('serviceCategories/Index', [
            'success' => 'Service category created successfully!',
            'serviceCategories' => $this->getServiceCategories(),
        ]);
    }
    public function show(Request $request){
        return Inertia::render('serviceCategories/ServiceCategoriesPublic', 
        [
            'category' => ServiceCategory::with('services')
                ->findOrFail($request->category_id)
        ]);
    }
    public function edit(Request $request){
        return Inertia::render('serviceCategories/Edit', 
        [
            'category' => ServiceCategory::with('services')
                ->findOrFail($request->category_id)
        ]);
    }
    public function update(Request $request){
        $validatedData = $request->validate(
            [
                'category_name' => 'required|string|max:255',
                'category_description' => 'nullable|string',
                'category_image' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:10120',
            ]

        );
        if ($request->hasFile('category_image')) {
            $imagePath = $request->file('category_image')->store('service_categories', 'public');
            $validatedData['category_image'] = $imagePath;
        }
        ServiceCategory::find($request->category_id)->update($validatedData);

        return redirect()
            ->route('dashboard')
            ->with([
                'success' => 'Service updated successfully.',
                'activeTab' => 'SERVICE CATEGORIES',
            ]);
    }
    public function display(Request $request){
        return Inertia('serviceCategories/Show', [
            'serviceCategory' => \App\Models\serviceCategory::findOrFail($request->category_id)
        ]);
    }
}
