<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Verts;
use App\Models\verts as ModelsVerts;

class vertsController extends Controller
{
    public function index()
    {
        return route('dashboard');
    }
    public function store(Request $request){
        $validatedData = $request->validate([
             'advert_title' => 'required|string|max:255',
             'advert_description' => 'nullable|string|max:255',
             'advert_link' => 'nullable|string|max:255',
             'advert_image' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:10240',
         ]);
         if ($request->hasFile('advert_image')) {
            $imagePath = $request->file('advert_image')->store('advert_images', 'public');
            $validatedData['advert_image'] = $imagePath;
            }
         verts::create($validatedData);
         return redirect()->route('dashboard')->with('success', 'Vert added successfully');
    }
}
