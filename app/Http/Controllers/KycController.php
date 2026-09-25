<?php

namespace App\Http\Controllers;

use App\Models\Kyc;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;
use Inertia\Inertia;

class KycController extends Controller
{
    /**
     * Display a listing of KYC records.
     */
    public function index(Request $request)
    {
        $query = Kyc::query();

        // Search
        if ($request->has('search') && $request->search) {
            $query->search($request->search);
        }

        // Filter by KYC status
        if ($request->has('kyc_status') && $request->kyc_status) {
            switch ($request->kyc_status) {
                case 'verified':
                    $query->verified();
                    break;
                case 'pending':
                    $query->pendingKyc();
                    break;
                case 'rejected':
                    $query->rejectedKyc();
                    break;
                case 'expired':
                    $query->expiredKyc();
                    break;
            }
        }

        // Filter by approval status
        if ($request->has('approval_status') && $request->approval_status) {
            switch ($request->approval_status) {
                case 'approved':
                    $query->approved();
                    break;
                case 'pending':
                    $query->pendingApproval();
                    break;
            }
        }

        // Filter by district
        if ($request->has('district') && $request->district) {
            $query->inDistrict($request->district);
        }

        // Filter by date range
        if ($request->has('from_date') && $request->from_date) {
            $query->whereDate('created_at', '>=', $request->from_date);
        }
        if ($request->has('to_date') && $request->to_date) {
            $query->whereDate('created_at', '<=', $request->to_date);
        }

        // Expiring soon
        if ($request->has('expiring_soon') && $request->expiring_soon) {
            $query->expiringSoon($request->expiring_soon_days ?? 30);
        }

        $kycRecords = $query->latest()->paginate($request->per_page ?? 15);

        return response()->json([
            'success' => true,
            'data' => $kycRecords,
        ]);
    }

    public function create(){
        return Inertia::render('KYC/Create');
    }

    /**
     * Store a newly created KYC record.
     */
    public function store(Request $request)
    {
        $validator = $this->validateKyc($request);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'errors' => $validator->errors(),
            ], 422);
        }

        // Generate KYC identification number if not provided
        $data = $validator->validated();
        if (empty($data['kyc_identification_number'])) {
            $data['kyc_identification_number'] = $this->generateKycNumber();
        }

        // Set default KYC status
        if (empty($data['kyc_status'])) {
            $data['kyc_status'] = 'pending';
        }

        $kyc = Kyc::create($data);
        return redirect()
        ->back()
        ->with('success', 'KYC application submitted successfully.');
    }

    /**
     * Display the specified KYC record.
     */
    public function show(Kyc $kyc)
    {
        return Inertia::render('KYC/Show', [
            'kycApplicant' => $kyc,
        ]);
    }

    /**
     * Remove the specified KYC record.
     */
    public function destroy(Kyc $kyc)
    {
        $kyc->delete();

        return response()->json([
            'success' => true,
            'message' => 'KYC record deleted successfully.',
        ]);
    }

    /**
     * Verify a KYC record.
     */
    public function approve(Request $request, Kyc $kyc)
    {
        $validated = $request->validate([
            'cross_checked_comments' => 'nullable|string',
            'completed_by' => 'nullable|string|max:255',
            'date_completed' => 'nullable|date',
            'date_membership_update' => 'nullable|date',
            'member_identification_number' => 'nullable|string|max:100|unique:kyc,kyc_identification_number,' . $kyc->id,
            'approval_status' => 'nullable|string|in:approved,disapproved,pending',
            'approved_by' => 'nullable|string|max:255',
            'approval_date' => 'nullable|date',
            'branch_manager_name' => 'nullable|string|max:255',
        ]);

        $validated['approval_status'] = $validated['approval_status'] ?? 'approved';
        $validated['kyc_status'] = 'verified';
        $validated['verified_at'] = now();
        $validated['expires_at'] = now()->addYear();

        $kyc->update($validated);

        return redirect()
            ->back()
            ->with('success', 'KYC record approved successfully.');
    }

    /**
     * Reject a KYC record.
     */
    public function reject(Request $request, Kyc $kyc)
    {
        $request->validate([
            'approved_by' => 'required|string|max:255',
            'verification_notes' => 'required|string|max:1000',
        ]);

        $kyc->update([
            'kyc_status' => 'rejected',
            'approval_status' => 'disapproved',
            'approved_by' => $request->approved_by,
            'approval_date' => now()->toDateString(),
            'verification_notes' => $request->verification_notes,
        ]);

        return response()->json([
            'success' => true,
            'message' => 'KYC record rejected.',
            'data' => $kyc,
        ]);
    }

    /**
     * Validate the KYC request.
     */
    private function validateKyc(Request $request, ?int $id = null)
    {
        $rules = [
            // Personal Details
            'member_sacco_number' => 'nullable|string|max:100',
            'member_phone_number' => 'required|string|max:20',
            'id_type' => 'required|string|in:national_id,passport,drivers_license',
            'id_number' => 'required|string|max:100',
            'surname' => 'required|string|max:255',
            'first_names' => 'required|string|max:255',
            'date_of_birth' => 'nullable|date|before:today',
            'gender' => 'nullable|string|in:male,female',
            'physical_address' => 'nullable|string',
            'mailing_address' => 'nullable|string',
            'home_address' => 'nullable|string',
            'village' => 'nullable|string|max:255',
            'traditional_authority' => 'nullable|string|max:255',
            'district' => 'nullable|string|max:255',
            'email' => 'nullable|email|max:255',

            // Referees
            'referee_name' => 'nullable|string|max:255',
            'referee_occupation' => 'nullable|string|max:255',
            'referee_address' => 'nullable|string',
            'referee_phone' => 'nullable|string|max:20',

            // Declaration
            'declaration_accepted' => 'required|accepted',

            // Official Use Only
            'cross_checked_comments' => 'nullable|string',
            'completed_by' => 'nullable|string|max:255',
            'date_completed' => 'nullable|date',
            'date_kyc_update' => 'nullable|date',
            'kyc_identification_number' => 'nullable|string|max:100|unique:kyc,kyc_identification_number,' . ($id ?? 'NULL'),
            'approved_by' => 'nullable|string|max:255',
            'branch_manager_name' => 'nullable|string|max:255',
            'approval_date' => 'nullable|date',
            'approval_status' => ['nullable', 'string', Rule::in(['pending', 'approved', 'disapproved'])],

            // KYC specific fields
            'kyc_status' => ['nullable', 'string', Rule::in(['pending', 'verified', 'rejected', 'expired'])],
            'verified_at' => 'nullable|date',
            'expires_at' => 'nullable|date|after:today',
            'verification_notes' => 'nullable|string|max:1000',
        ];

        return Validator::make($request->all(), $rules);
    }

    /**
     * Generate a unique KYC identification number.
     */
    private function generateKycNumber(): string
    {
        $prefix = 'KYC';
        $year = date('Y');
        $lastKyc = Kyc::latest('id')->first();
        $number = $lastKyc ? str_pad($lastKyc->id + 1, 6, '0', STR_PAD_LEFT) : '000001';

        return $prefix . $year . $number;
    }

    /**
     * Get KYC statistics.
     */
    public function statistics()
    {
        $total = Kyc::count();
        $verified = Kyc::verified()->count();
        $pending = Kyc::pendingKyc()->count();
        $rejected = Kyc::rejectedKyc()->count();
        $expired = Kyc::expiredKyc()->count();

        // District breakdown
        $districts = Kyc::select('district')
            ->selectRaw('count(*) as count')
            ->whereNotNull('district')
            ->groupBy('district')
            ->get()
            ->pluck('count', 'district')
            ->toArray();

        // Monthly registrations for the last 12 months
        $monthly = Kyc::selectRaw('DATE_FORMAT(created_at, "%Y-%m") as month')
            ->selectRaw('count(*) as count')
            ->whereDate('created_at', '>=', now()->subMonths(12))
            ->groupBy('month')
            ->orderBy('month')
            ->get()
            ->pluck('count', 'month')
            ->toArray();

        // Expiring soon
        $expiringSoon = Kyc::expiringSoon()->count();

        return response()->json([
            'success' => true,
            'data' => [
                'total' => $total,
                'verified' => $verified,
                'pending' => $pending,
                'rejected' => $rejected,
                'expired' => $expired,
                'expiring_soon' => $expiringSoon,
                'verification_rate' => $total > 0 ? round(($verified / $total) * 100, 2) : 0,
                'districts' => $districts,
                'monthly_registrations' => $monthly,
            ],
        ]);
    }

    /**
     * Export KYC records to CSV.
     */
    public function export(Request $request)
    {
        $query = Kyc::query();

        // Apply filters
        if ($request->has('kyc_status') && $request->kyc_status) {
            $query->where('kyc_status', $request->kyc_status);
        }

        if ($request->has('from_date') && $request->from_date) {
            $query->whereDate('created_at', '>=', $request->from_date);
        }

        if ($request->has('to_date') && $request->to_date) {
            $query->whereDate('created_at', '<=', $request->to_date);
        }

        $kycRecords = $query->get();

        $headers = [
            'Content-Type' => 'text/csv',
            'Content-Disposition' => 'attachment; filename="kyc_records_' . date('Y-m-d') . '.csv"',
        ];

        $callback = function () use ($kycRecords) {
            $handle = fopen('php://output', 'w');

            // Headers
            fputcsv($handle, [
                'ID', 'KYC Number', 'Full Name', 'Surname', 'First Names',
                'Phone', 'Email', 'ID Type', 'ID Number', 'District',
                'KYC Status', 'Approval Status', 'Verified At', 'Expires At',
                'Approved By', 'Created At'
            ]);

            // Data
            foreach ($kycRecords as $kyc) {
                fputcsv($handle, [
                    $kyc->id,
                    $kyc->kyc_identification_number ?? 'N/A',
                    $kyc->full_name,
                    $kyc->surname,
                    $kyc->first_names,
                    $kyc->member_phone_number,
                    $kyc->email ?? 'N/A',
                    $kyc->id_type,
                    $kyc->id_number,
                    $kyc->district ?? 'N/A',
                    $kyc->kyc_status,
                    $kyc->approval_status,
                    $kyc->verified_at ?? 'N/A',
                    $kyc->expires_at ?? 'N/A',
                    $kyc->approved_by ?? 'N/A',
                    $kyc->created_at,
                ]);
            }

            fclose($handle);
        };

        return response()->stream($callback, 200, $headers);
    }

    /**
     * Generate a KYC number (public endpoint).
     */
    public function generateKycNumberPublic()
    {
        return response()->json([
            'success' => true,
            'kyc_number' => $this->generateKycNumber(),
        ]);
    }

    /**
     * Get districts list with KYC counts.
     */
    public function districts()
    {
        $districts = Kyc::select('district')
            ->selectRaw('count(*) as count')
            ->whereNotNull('district')
            ->groupBy('district')
            ->orderBy('district')
            ->get();

        return response()->json([
            'success' => true,
            'data' => $districts,
        ]);
    }

    /**
     * Bulk verify KYC records.
     */
    public function bulkVerify(Request $request)
    {
        $request->validate([
            'ids' => 'required|array',
            'ids.*' => 'exists:kyc,id',
            'approved_by' => 'required|string|max:255',
            'branch_manager_name' => 'required|string|max:255',
            'expires_at' => 'nullable|date|after:today',
        ]);

        $expiresAt = $request->expires_at ?? now()->addYear();

        $count = Kyc::whereIn('id', $request->ids)
            ->where('kyc_status', 'pending')
            ->update([
                'kyc_status' => 'verified',
                'approval_status' => 'approved',
                'approved_by' => $request->approved_by,
                'branch_manager_name' => $request->branch_manager_name,
                'approval_date' => now()->toDateString(),
                'date_kyc_update' => now()->toDateString(),
                'verified_at' => now(),
                'expires_at' => $expiresAt,
            ]);

        return response()->json([
            'success' => true,
            'message' => "{$count} KYC records verified successfully.",
            'count' => $count,
        ]);
    }

    /**
     * Check KYC status for a member.
     */
    public function checkStatus(Request $request)
    {
        $request->validate([
            'member_sacco_number' => 'required|string|max:100',
        ]);

        $kyc = Kyc::where('member_sacco_number', $request->member_sacco_number)
            ->latest()
            ->first();

        if (!$kyc) {
            return response()->json([
                'success' => false,
                'message' => 'No KYC record found for this member.',
            ], 404);
        }

        return response()->json([
            'success' => true,
            'data' => [
                'status' => $kyc->kyc_status,
                'is_verified' => $kyc->isVerified(),
                'is_expired' => $kyc->isExpired(),
                'verified_at' => $kyc->verified_at,
                'expires_at' => $kyc->expires_at,
                'kyc_identification_number' => $kyc->kyc_identification_number,
            ],
        ]);
    }
}