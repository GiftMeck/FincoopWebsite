<?php

namespace App\Http\Controllers;

use App\Models\Membership;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;
use Inertia\Inertia;

class MembershipController extends Controller
{
    /**
     * Display a listing of the memberships.
     */
    public function index(Request $request)
    {
        $query = Membership::query();

        // Search by name or member number
        if ($request->has('search') && $request->search) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('first_name', 'like', "%{$search}%")
                  ->orWhere('surname', 'like', "%{$search}%")
                  ->orWhere('member_identification_number', 'like', "%{$search}%")
                  ->orWhere('cell_phone', 'like', "%{$search}%")
                  ->orWhere('email', 'like', "%{$search}%");
            });
        }

        // Filter by status
        if ($request->has('status')) {
            if ($request->status === 'approved') {
                $query->approved();
            } elseif ($request->status === 'pending') {
                $query->pending();
            }
        }

        $memberships = $query->latest()->paginate(15);

        return response()->json([
            'success' => true,
            'data' => $memberships,
        ]);
    }
    /**
     * Display the form to create a new membership.
     */
    public function create(){
        return Inertia::render('Membership/Create');
    }
    /**
     * Store a newly created membership.
     */
    public function store(Request $request)
    {
        $validator = $this->validateMembership($request);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'errors' => $validator->errors(),
            ], 422);
        }

        $membership = Membership::create($validator->validated());
        return redirect()
        ->back()
        ->with('success', 'Membership application submitted successfully.');
    }

    /**
     * Display the specified membership.
     */
    public function show(Membership $membership)
    {
        return Inertia::render('Membership/Show', ['membershipApplicant' => $membership]);
    }

    /**
     * Update the specified membership.
     */
    public function update(Request $request, Membership $membership)
    {
        $validator = $this->validateMembership($request, $membership->id);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'errors' => $validator->errors(),
            ], 422);
        }

        $membership->update($validator->validated());

        return response()->json([
            'success' => true,
            'message' => 'Membership updated successfully.',
            'data' => $membership,
        ]);
    }

    /**
     * Remove the specified membership.
     */
    public function destroy(Membership $membership)
    {
        $membership->delete();

        return response()->json([
            'success' => true,
            'message' => 'Membership deleted successfully.',
        ]);
    }

    /**
     * Approve a membership application.
     */
    public function approve(Request $request, Membership $membershipApplicant)
    {
        /*dd([
            'membership_id' => $membershipApplicant->id,
            'membership_exists' => $membershipApplicant->exists,
            'route_name' => $request->route()->getName(),
            'route_parameters' => $request->route()->parameters(),
            'full_url' => $request->fullUrl(),
        ]);*/
        $validated = $request->validate([
            'entrance_fee_paid_on' => 'nullable|date',
            'entrance_fee_amount' => 'nullable|numeric|min:0',
            'receipt_number' => 'nullable|string|max:100',
            'completed_by' => 'nullable|string|max:255',
            'completed_date' => 'nullable|date',
            'date_of_admission' => 'nullable|date',
            'approved_disapproved_by' => 'nullable|string|max:255',
            'branch_manager' => 'nullable|string|max:255',
            'official_date' => 'nullable|date',
            'approval_status' => 'nullable|string|in:approved,disapproved,pending',
            ]);
        $membershipApplicant->update($validated);
        return redirect()->back()->with('success', 'Membership approved successfully.');
    }

    /**
     * Reject a membership application.
     */
    public function reject(Request $request, Membership $membership)
    {
        $request->validate([
            'approved_disapproved_by' => 'required|string|max:255',
            'rejection_reason' => 'nullable|string|max:1000',
        ]);

        $membership->update([
            'approved_disapproved_by' => $request->approved_disapproved_by,
            'date_of_admission' => null,
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Membership rejected.',
            'data' => $membership,
        ]);
    }

    /**
     * Validate the membership request.
     */
    private function validateMembership(Request $request, ?int $id = null)
    {
        $rules = [
            // Personal Details
            'title' => 'required|string|in:mr,mrs,miss,ms,dr',
            'surname' => 'required|string|max:255',
            'first_name' => 'required|string|max:255',
            'additional_name' => 'nullable|string|max:255',
            'date_of_birth' => 'required|date|before:today',
            'gender' => 'required|string|in:male,female',
            'nationality' => 'required|string|max:100',
            'marital_status' => 'required|string|in:married,divorced,single,widow,widower',
            'id_type' => 'required|string|in:national_id,passport,drivers_license',
            'id_number' => 'required|string|max:100',
            'income_source' => 'nullable|string|max:255',
            'occupation' => 'nullable|string|max:255',
            'qualification' => 'nullable|string|max:255',
            'number_of_dependants' => 'nullable|integer|min:0',

            // Address / Contact
            'village' => 'nullable|string|max:255',
            'traditional_authority' => 'nullable|string|max:255',
            'district' => 'nullable|string|max:255',
            'physical_address' => 'nullable|string',
            'mailing_address' => 'nullable|string',
            'telephone' => 'nullable|string|max:20',
            'cell_phone' => 'required|string|max:20',
            'email' => 'nullable|email|max:255',

            // Employment
            'employer_name' => 'nullable|string|max:255',
            'employer_address' => 'nullable|string',
            'employer_telephone' => 'nullable|string|max:20',
            'employer_fax_number' => 'nullable|string|max:20',

            // Monthly Deduction
            'employment_number' => 'nullable|string|max:100',
            'monthly_shares' => 'nullable|numeric|min:0',
            'monthly_savings_ps' => 'nullable|numeric|min:0',

            // Beneficiaries
            'beneficiary_1_name' => 'nullable|string|max:255',
            'beneficiary_1_relationship' => 'nullable|string|max:255',
            'beneficiary_1_birth_date_percentage' => 'nullable|string|max:255',
            'beneficiary_2_name' => 'nullable|string|max:255',
            'beneficiary_2_relationship' => 'nullable|string|max:255',
            'beneficiary_2_birth_date_percentage' => 'nullable|string|max:255',
            'beneficiary_3_name' => 'nullable|string|max:255',
            'beneficiary_3_relationship' => 'nullable|string|max:255',
            'beneficiary_3_birth_date_percentage' => 'nullable|string|max:255',

            // Referees
            'referee_name' => 'nullable|string|max:255',
            'referee_occupation' => 'nullable|string|max:255',
            'referee_address' => 'nullable|string',
            'referee_phone_number' => 'nullable|string|max:20',

            // Declaration
            'declaration_accepted' => 'required|accepted',
            'applicant_signature' => 'required|string|max:255',
            'thumb_print' => 'nullable|string|max:255',
            'application_date' => 'required|date',

            // Official Use Only (updated by staff)
            'entrance_fee_paid_on' => 'nullable|date',
            'entrance_fee_amount' => 'nullable|numeric|min:0',
            'receipt_number' => 'nullable|string|max:100',
            'completed_by' => 'nullable|string|max:255',
            'completed_date' => 'nullable|date',
            'date_of_admission' => 'nullable|date',
            'member_identification_number' => 'nullable|string|max:100|unique:memberships,member_identification_number,' . ($id ?? 'NULL'),
            'approved_disapproved_by' => 'nullable|string|max:255',
            'branch_manager' => 'nullable|string|max:255',
            'official_signature' => 'nullable|string|max:255',
            'official_date' => 'nullable|date',
        ];

        return Validator::make($request->all(), $rules);
    }

    /**
     * Generate a unique member identification number.
     */
    public function generateMemberNumber()
    {
        $prefix = 'FIN';
        $year = date('Y');
        $lastMember = Membership::latest('id')->first();
        $number = $lastMember ? str_pad($lastMember->id + 1, 6, '0', STR_PAD_LEFT) : '000001';

        $memberNumber = $prefix . $year . $number;

        return response()->json([
            'success' => true,
            'member_number' => $memberNumber,
        ]);
    }

    /**
     * Export memberships to CSV.
     */
    public function export()
    {
        $memberships = Membership::all();

        $headers = [
            'Content-Type' => 'text/csv',
            'Content-Disposition' => 'attachment; filename="memberships_' . date('Y-m-d') . '.csv"',
        ];

        $callback = function () use ($memberships) {
            $handle = fopen('php://output', 'w');

            // Headers
            fputcsv($handle, [
                'ID', 'Member Number', 'Full Name', 'Surname', 'First Name',
                'Cell Phone', 'Email', 'District', 'Date of Admission', 'Created At'
            ]);

            // Data
            foreach ($memberships as $membership) {
                fputcsv($handle, [
                    $membership->id,
                    $membership->member_identification_number,
                    $membership->full_name,
                    $membership->surname,
                    $membership->first_name,
                    $membership->cell_phone,
                    $membership->email,
                    $membership->district,
                    $membership->date_of_admission,
                    $membership->created_at,
                ]);
            }

            fclose($handle);
        };

        return response()->stream($callback, 200, $headers);
    }

    /**
     * Get membership statistics.
     */
    public function statistics()
    {
        $total = Membership::count();
        $approved = Membership::approved()->count();
        $pending = Membership::pending()->count();

        return response()->json([
            'success' => true,
            'data' => [
                'total' => $total,
                'approved' => $approved,
                'pending' => $pending,
                'approval_rate' => $total > 0 ? round(($approved / $total) * 100, 2) : 0,
            ],
        ]);
    }
}