<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class FaqController extends Controller
{
    public function index(Request $request)
    {
        $ActionSource = $request->query('ActionSource', 'public');
        if($ActionSource === 'finprivate'){
            return Inertia::render('faqs/Index', ['ActionSource' => $ActionSource]);
        }
        return Inertia::render('faq/FaqPublic',
            [
                'faqs' => \App\Models\faq::all(),
            ]
        );
    }
    public function store(Request $request){
        $validatedData = $request->validate(
            [
                'faq_question' => 'required|string',
                'faq_answer' => 'nullable|string',
                'question_owner_id' => 'nullable',
                'answer_owner_id' => 'nullable',
                'demo_photo' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:10240',
            ]
            );
            if ($request->hasFile('demo_photo')) {
            $imagePath = $request->file('demo_photo')->store('faq_images', 'public');
            $validatedData['demo_photo'] = $imagePath;
            }
            \App\Models\faq::create($validatedData);
        return Inertia::render('faq/Index',
            [
                'faqs' => \App\Models\faq::All(),
                'ActionSource' => $request->query('ActionSource', 'public')
            ]
            );
    }
    public function show(Request $request){
        return Inertia::render('faq/Show', [
            'faq' => \App\Models\faq::findOrFail($request->faq_id),
            'ActionSource' => $request->query('ActionSource', 'public')
        ]);
    }
    public function update(Request $request){
        $validatedData = $request->validate(
            [
                'faq_question' => 'required|string',
                'faq_answer' => 'nullable|string',
                'question_owner_id' => 'nullable',
                'answer_owner_id' => 'nullable',
                'demo_photo' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:10240',
            ]
            );
            if ($request->hasFile('demo_photo')) {
            $imagePath = $request->file('demo_photo')->store('faq_images', 'public');
            $validatedData['demo_photo'] = $imagePath;
            }
            $faq = \App\Models\faq::find($request->faq_id);
            $faq->update($validatedData);
            return redirect()
            ->route('dashboard')
            ->with([
                'success' => 'Faq updated successfully.',
                'activeTab' => 'FAQs',
            ]);
    }
    public function destroy(Request $request){
    }
}
