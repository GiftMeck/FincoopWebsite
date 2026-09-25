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
            'customer_name' => 'required|string',
            'customer_email' => 'nullable|email|unique:customers',
            'customer_phone' => 'required',
            'customer_message' => 'required',
        ]);
        Customer::create($validatedData);
        return redirect()
        ->back()
        ->with('success', 'Thank you! Your feedback has been submitted successfully.');
    }
}
