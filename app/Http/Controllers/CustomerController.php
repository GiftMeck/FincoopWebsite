<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Customer;
use Inertia\Inertia;

class CustomerController extends Controller
{
    public function index(Request $request)
    {
        $ActionSource = $request->query('ActionSource', 'public');
        if($ActionSource === 'finprivate'){
            return Inertia::render('customers/Index', ['ActionSource' => $ActionSource]);
        }
        return Inertia::render('customers/CustomersPublic', 
            [
                'customers' => Customer::all(),
            ]
        );
    }
    public function create(){
        return Inertia::render('customers/CustomersPublic');
    }
    public function store(Request $request){
        $validatedData = $request->validate([
            'customer_name' => ['required', 'string', 'max:100', 'regex:/^[a-zA-Z\s]+$/', 'not_regex:/<script.*?>.*?<\/script>/i'],
            'customer_email' => ['required', 'string', 'email', 'max:50', 'regex:/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/'],
            'customer_phone' => ['required', 'string', 'max:15', 'regex:/^\+?[0-9]{10,15}$/'],
            'customer_message' => ['required', 'string', 'max:255', 'regex:/^[a-zA-Z\s]+$/', 'not_regex:/<script.*?>.*?<\/script>/i'],
        ]);
        Customer::create($validatedData);
        return redirect()
        ->back()
        ->with('success', 'Thank you! Your feedback has been submitted successfully.');
    }
}
