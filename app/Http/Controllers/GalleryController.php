<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class GalleryController extends Controller
{
   
    public function index(Request $request)
    {
        $ActionSource = $request->query('ActionSource', 'public');
        if($ActionSource === 'finprivate'){
            return Inertia::render('gallery/Index', ['ActionSource' => $ActionSource]);
        }
        return Inertia::render('gallery/GalleryPublic', 
            [
                'galleries' => \App\Models\Gallery::all(),
            ]
        );
    }
    public function store(Request $request){
        $validatedData = $request->validate(
            [
                'gallery_title' => 'required|string',
                'gallery_description' => 'required|string',
                'branch_id' => 'nullable|exists:branches,branch_id',
                'user_id' => 'nullable|exists:users,id',
                'service_id' => 'nullable|exists:services,service_id',
                'partner_id' => 'nullable|exists:partners,partner_id',
                'gallery_image' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:10240',
                'gallery_video' => 'nullable'
            ]
            );
            if ($request->hasFile('gallery_image')) {
            $imagePath = $request->file('gallery_image')->store('gallery_images', 'public');
            $validatedData['gallery_image'] = $imagePath;
            }
            if ($request->hasFile('gallery_video')) {
            $imagePath = $request->file('gallery_video')->store('gallery_videos', 'public');
            $validatedData['gallery_video'] = $imagePath;
            }
            \App\Models\gallery::create($validatedData);
            return redirect()->back()->with('success', 'Gallery created successfully.');
    }
    public function show(Request $request){
        $gallery = \App\Models\gallery::findOrFail($request->gallery_id);
        return Inertia::render('gallery/Show', ['gallery' => $gallery]);
    }
}
