<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class TestimonialController extends Controller
{
    public function index(Request $request)
    {
        $ActionSource = $request->query('ActionSource', 'public');
        if($ActionSource === 'finprivate'){
            return Inertia::render('testimonials/Index', ['ActionSource' => $ActionSource]);
        }
        return Inertia::render('testimonials/TestimonialsPublic', 
            [
                'testimonials' => \App\Models\Testimonial::with('customer')->get(),
            ]
        );
    }

    public function create(Request $request)
    {
        $ActionSource = $request->query('ActionSource', 'public');
        $partners = \App\Models\Partner::all();
        $customers = \App\Models\Customer::all();
        return inertia('testimonials/Create', 
        [
            'partners' => $partners,
            'customers' => $customers,
            'ActionSource' => $ActionSource
        ]);
    }
    public function store(Request $request){
        $validatedData = $request->validate(
            [
                'testimonial_title' => 'required|string',
                'testimonial_content' => 'required|string',
                'partner_id' => 'nullable',
                'customer_id' => 'nullable',
                'testimonial_image' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:10240',
            ]
            );
            if($request->hasFile('testimonial_image')){
                $imagePath = $request->file('testimonial_image')->store('testimonial_images', 'public');
                $validatedData['testimonial_image'] = $imagePath;
            }
            \App\Models\testimonial::create($validatedData);

            return redirect()->back()->with('success', 'testimonial created successfully!');
    }
    public function show(Request $request){
        $testimonial = \App\Models\testimonial::with('customer')->findOrFail($request->testimonial_id);
        return Inertia::render('testimonials/Show', [
            'testimonial' => $testimonial,
            'ActionSource' => $request->ActionSource
        ]);
    }
}
