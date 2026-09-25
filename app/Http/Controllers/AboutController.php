<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\About;

class AboutController extends Controller
{
    public function index(Request $request)
    {
        $ActionSource = $request->query('ActionSource', 'public');
        if($ActionSource === 'finprivate'){
            return Inertia::render('about/Index', ['ActionSource' => $ActionSource]);
        }
        return Inertia::render('about/AboutPublic', 
            [
                'abouts' => \App\Models\about::all(),
            ]
        );
    }
    public function store(Request $request){
        $validatedData = $request->validate(
            [
                'about_title' => 'required',
                'about_description' => 'required',
                'about_image' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            ]
            );
            if ($request->hasFile('about_image')) {
            $imagePath = $request->file('about_image')->store('about_images', 'public');
            $validatedData['about_image'] = $imagePath;
            }

        // Create the service category
        About::create($validatedData);

        return route('dashboard', [
            'success' => 'Service category created successfully!',
            'ActionSource' => $request->query('ActionSource', 'public'),
            ]
         );
        
    }
    public function update(Request $request){
        $validatedData = $request->validate(
            [
                'about_title' => 'required',
                'about_description' => 'required',
                'about_image' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:10240',
            ]
            );
            if ($request->hasFile('about_image')) {
            $imagePath = $request->file('about_image')->store('about_images', 'public');
            $validatedData['about_image'] = $imagePath;
            }
        About::findOrFail($request->about_id)->update($validatedData);
        return redirect()->route('dashboard')->with(
            [
                'success' => 'About updated successfully',
                'activeTab' => 'ABOUT'
            ]
            );
    }
}
