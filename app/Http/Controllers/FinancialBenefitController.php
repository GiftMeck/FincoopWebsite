<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\financial_benefit;

class FinancialBenefitController extends Controller
{
    public function index()
    {
        return route('dashboard');
    }
    public function store(Request $request){
        $validatedData = $request->validate([
            'benefit_name' => 'required|string',
            'benefit_description' => 'required|string',
            'benefit_type' => 'nullable|string',
            'category_id' => 'nullable'
        ]);
        $randamFinancialBenefitId = mt_rand(100000, 999999);
        $financialBenefit = financial_benefit::create([
            'financial_benefit_id' => $randamFinancialBenefitId,
            'benefit_name' => $validatedData['benefit_name'],
            'benefit_description' => $validatedData['benefit_description'],
            'benefit_type' => $validatedData['benefit_type'],
            'category_id' => $validatedData['category_id']
        ]);
        return route('dashboard');
    }
}
