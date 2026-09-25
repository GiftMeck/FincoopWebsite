<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\document;
use Illuminate\Support\Facades\Storage;

class DocumentController extends Controller
{
    public function index()
    {
        return Inertia::render('Documents/Create');
    }

    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'document_name' => 'required|string',
            'document_type' => 'required|string',
            'document_status' => 'required|string',
            'document_owner' => 'required|string',
            'document_description' => 'nullable|string',

            'document_path' => [
                'required',
                'file',
                'mimes:pdf,doc,docx,html,txt,csv,xls,xlsx',
            ],
        ]);
        $documentPath = $request
            ->file('document_path')
            ->store('documents', 'public');

         $validatedData['document_path'] = $documentPath;

        document::create($validatedData);

        return redirect()
            ->back()
            ->with('success', 'Document created successfully');
    }
    public function update(Request $request){
        $validatedData = $request->validate([
            'document_name' => 'required|string',
            'document_type' => 'required|string',
            'document_status' => 'required|string',
            'document_owner' => 'required|string',
            'document_description' => 'nullable|string',

            'document_path' => [
                'required',
                'file',
                'mimes:pdf,doc,docx,html,txt,csv,xls,xlsx',
            ],
        ]);
        $documentPath = $request
            ->file('document_path')
            ->store('documents', 'public');

         $validatedData['document_path'] = $documentPath;

        document::findOrFail($request->document_id)->update($validatedData);

        return redirect()
            ->route('dashboard')
            ->with(
                [
                    'success' => 'Document updated successfully',
                    'activeTab' => 'DOCUMENTS'
                ]);
    }

    public function download(Document $document)
    {
        return Storage::disk('public')->download(
            $document->document_path,
            basename($document->document_path)
        );
    }
}

