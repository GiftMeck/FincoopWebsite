<?php

namespace App\Http\Controllers;

use App\Models\MobileBankingApplication;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;
use Inertia\Inertia;

class MobileBankingApplicationController extends Controller
{
    /**
     * Display a listing of the mobile banking applications.
     */
    public function index(Request $request)
    {
        $query = MobileBankingApplication::query();

        // Search
        if ($request->has('search') && $request->search) {
            $query->search($request->search);
        }

        // Filter by status
        if ($request->has('status') && $request->status) {
            switch ($request->status) {
                case 'pending':
                    $query->pending();
                    break;
                case 'approved':
                    $query->approved();
                    break;
                case 'rejected':
                    $query->rejected();
                    break;
                case 'processed':
                    $query->processed();
                    break;
            }
        }

        // Filter by request type
        if ($request->has('request_type') && $request->request_type) {
            $query->ofRequestType($request->request_type);
        }

        // Filter by date range
        if ($request->has('from_date') && $request->from_date) {
            $query->whereDate('created_at', '>=', $request->from_date);
        }
        if ($request->has('to_date') && $request->to_date) {
            $query->whereDate('created_at', '<=', $request->to_date);
        }

        $applications = $query->latest()->paginate($request->per_page ?? 15);

        return response()->json([
            'success' => true,
            'data' => $applications,
        ]);
    }
    public function create(){
        return Inertia::render('MobileBanking/Create');
    }
    /**
     * Store a newly created mobile banking application.
     */
    public function store(Request $request)
    {
        $validator = $this->validateApplication($request);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'errors' => $validator->errors(),
            ], 422);
        }

        $application = MobileBankingApplication::create($validator->validated());
        return redirect()
        ->back()
        ->with('success', 'Mobile banking application submitted successfully.');
    }

    /**
     * Display the specified mobile banking application.
     */
    public function show(MobileBankingApplication $mobileBankingApplicant)
    {
        return Inertia::render('MobileBanking/Show', ['mobileBankingApplicant' => $mobileBankingApplicant]);
    }

    /**

    **
     * Remove the specified mobile banking application.
     */
    public function destroy(MobileBankingApplication $mobileBankingApplicant)
    {
        $mobileBankingApplicant->delete();

        return response()->json([
            'success' => true,
            'message' => 'Mobile banking application deleted successfully.',
        ]);
    }

    /**
     * Approve a mobile banking application.
     */
    public function approve(Request $request, MobileBankingApplication $mobileBankingApplicant)
    {
        $validated = $request->validate([
            'member_customer_number' => 'nullable|string|max:100',
            'received_by' => 'nullable|string|max:255',
            'received_date' => 'nullable|date',
            'approved_by' => 'nullable|string|max:255',
            'approved_date' => 'nullable|date',
            'processed_by' => 'nullable|string|max:255',
            'processed_date' => 'nullable|date',
            'status' => 'nullable|string|in:approved,disapproved,pending,processed',
        ]);
    
        $mobileBankingApplicant->update($validated);
        return redirect()->back()->with('success', 'Mobile banking application approved successfully.');
    }

    /**
     * Reject a mobile banking application.
     */
    public function reject(Request $request, MobileBankingApplication $mobileBankingApplication)
    {
        $request->validate([
            'approved_by' => 'required|string|max:255',
            'rejection_reason' => 'nullable|string|max:1000',
        ]);

        $mobileBankingApplication->update([
            'status' => 'rejected',
            'approved_by' => $request->approved_by,
            'approved_date' => now()->toDateString(),
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Mobile banking application rejected.',
            'data' => $mobileBankingApplication,
        ]);
    }

    /**
     * Process a mobile banking application (mark as processed).
     */
    public function process(Request $request, MobileBankingApplication $mobileBankingApplication)
    {
        $request->validate([
            'processed_by' => 'required|string|max:255',
        ]);

        $mobileBankingApplication->update([
            'status' => 'processed',
            'processed_by' => $request->processed_by,
            'processed_date' => now()->toDateString(),
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Mobile banking application marked as processed.',
            'data' => $mobileBankingApplication,
        ]);
    }

    /**
     * Validate the mobile banking application request.
     */
    private function validateApplication(Request $request, ?int $id = null)
    {
        $rules = [
            // Request & Customer Details
            'request_type' => 'required|string',
            'title' => 'required|string|in:mr,mrs,miss,ms,dr',
            'first_name' => 'required|string|max:255',
            'surname' => 'required|string|max:255',
            'id_type' => 'required|string|in:national_id,passport,drivers_license',
            'id_number' => 'required|string|max:100',
            'cell_phone' => 'required|string|max:20',
            'sacc_number_employment' => 'required|string|max:100',
            'email' => 'nullable|email|max:255',
            'postal_address' => 'nullable|string|max:500',

            // Linked Mobile Phone
            'add_mobile_number' => 'sometimes|boolean',
            'remove_mobile_number' => 'sometimes|boolean',
            'mobile_1_number' => 'required|string|max:20',
            'mobile_1_sms_notification' => 'nullable|string|max:255',
            'mobile_2_number' => 'nullable|string|max:20',
            'mobile_2_sms_notification' => 'nullable|string|max:255',

            // Services
            'balance_savings' => 'sometimes|boolean',
            'balance_loans' => 'sometimes|boolean',
            'balance_other' => 'sometimes|boolean',
            'balance_other_specify' => 'nullable|string|max:255',
            'funds_transfer' => 'sometimes|boolean',

            // Declaration
            'declaration_accepted' => 'required|accepted',
            'signature' => 'required|string|max:255',
            'declaration_date' => 'required|date',

            // Office Use Only (updated by staff)
            'member_customer_number' => 'nullable|string|max:100',
            'received_by' => 'nullable|string|max:255',
            'received_date' => 'nullable|date',
            'approved_by' => 'nullable|string|max:255',
            'approved_date' => 'nullable|date',
            'processed_by' => 'nullable|string|max:255',
            'processed_date' => 'nullable|date',
        ];

        return Validator::make($request->all(), $rules);
    }

    /**
     * Get application statistics.
     */
    public function statistics()
    {
        $total = MobileBankingApplication::count();
        $pending = MobileBankingApplication::pending()->count();
        $approved = MobileBankingApplication::approved()->count();
        $rejected = MobileBankingApplication::rejected()->count();
        $processed = MobileBankingApplication::processed()->count();

        // Request type breakdown
        $requestTypes = MobileBankingApplication::select('request_type')
            ->selectRaw('count(*) as count')
            ->groupBy('request_type')
            ->get()
            ->pluck('count', 'request_type')
            ->toArray();

        return response()->json([
            'success' => true,
            'data' => [
                'total' => $total,
                'pending' => $pending,
                'approved' => $approved,
                'rejected' => $rejected,
                'processed' => $processed,
                'request_types' => $requestTypes,
                'approval_rate' => $total > 0 ? round((($approved + $processed) / $total) * 100, 2) : 0,
            ],
        ]);
    }

    /**
     * Export applications to CSV.
     */
    public function export(Request $request)
    {
        $query = MobileBankingApplication::query();

        // Apply filters
        if ($request->has('status') && $request->status) {
            $query->where('status', $request->status);
        }

        if ($request->has('from_date') && $request->from_date) {
            $query->whereDate('created_at', '>=', $request->from_date);
        }

        if ($request->has('to_date') && $request->to_date) {
            $query->whereDate('created_at', '<=', $request->to_date);
        }

        $applications = $query->get();

        $headers = [
            'Content-Type' => 'text/csv',
            'Content-Disposition' => 'attachment; filename="mobile_banking_applications_' . date('Y-m-d') . '.csv"',
        ];

        $callback = function () use ($applications) {
            $handle = fopen('php://output', 'w');

            // Headers
            fputcsv($handle, [
                    'id',
                    'cell_phone',
                    'sacc_number_employment',
                    'request_type',
                    'title',
                    'first_name',
                    'surname',
                    'id_type',
                    'id_number',
                    'email',
                    'postal_address',

                    // Linked Mobile Phone
                    'add_mobile_number',
                    'remove_mobile_number',
                    'mobile_1_sms_notification',
                    'mobile_2_sms_notification',

                    // Services
                    'balance_savings',
                    'balance_loans',
                    'balance_other',
                    'balance_other_specify',
                    'funds_transfer',

                    // Declaration
                    'declaration_accepted',
                    'declaration_date',

                    // Office Use Only
                    'member_customer_number',
                    'received_by',
                    'received_date',
                    'approved_by',
                    'approved_date',
                    'processed_by',
                    'processed_date',

                    'status',
                    'mobile_1_number',
                    'mobile_2_number',
                    'selected_services',
                    'created_at'
            ]);

            // Data
            foreach ($applications as $application) {
                fputcsv($handle, [
                    // Request & Customer Details
                    $application->id ?? 'N/A',
                    $application->cell_phone ?? 'N/A',
                    $application->sacc_number_employment ?? 'N/A',
                    $application->request_type ?? 'N/A',
                    $application->title ?? 'N/A',
                    $application->first_name ?? 'N/A',
                    $application->surname ?? 'N/A',
                    $application->id_type ?? 'N/A',
                    $application->id_number ?? 'N/A',
                    $application->email ?? 'N/A',
                    $application->postal_address ?? 'N/A',

                    // Linked Mobile Phone
                    $application->add_mobile_number ? 'Yes' : 'No' ?? 'N/A',
                    $application->remove_mobile_number ? 'Yes' : 'No' ?? 'N/A',
                    $application->mobile_1_sms_notification ? 'Yes' : 'No' ?? 'N/A',
                    $application->mobile_2_sms_notification ? 'Yes' : 'No' ?? 'N/A',

                    // Services
                    $application->balance_savings ? 'Yes' : 'No' ?? 'N/A',
                    $application->balance_loans ? 'Yes' : 'No' ?? 'N/A',
                    $application->balance_other ? 'Yes' : 'No' ?? 'N/A',
                    $application->balance_other_specify ?? 'N/A',
                    $application->funds_transfer ? 'Yes' : 'No' ?? 'N/A',

                    // Declaration
                    $application->declaration_accepted ? 'Accepted' : 'Not Accepted' ?? 'N/A',
                    $application->declaration_date ?? 'N/A',

                    // Office Use Only
                    $application->member_customer_number ?? 'N/A',
                    $application->received_by ?? 'N/A',
                    $application->received_date ?? 'N/A',
                    $application->approved_by ?? 'N/A',
                    $application->approved_date ?? 'N/A',
                    $application->processed_by ?? 'N/A',
                    $application->processed_date ?? 'N/A',
                    
                    $application->status ?? 'N/A',
                    $application->mobile_1_number ?? 'N/A',
                    $application->mobile_2_number ?? 'N/A',
                    implode('; ', $application->selected_services) ?? 'N/A',
                    $application->created_at ?? 'N/A',
                ]);
            }

            fclose($handle);
        };

        return response()->stream($callback, 200, $headers);
    }

    /**
     * Get mobile numbers for a customer.
     */
    public function getCustomerMobileNumbers(Request $request)
    {
        $request->validate([
            'sacc_number_employment' => 'required|string|max:100',
        ]);

        $applications = MobileBankingApplication::where('sacc_number_employment', $request->sacc_number_employment)
            ->whereIn('status', ['approved', 'processed'])
            ->get();

        $mobileNumbers = [];
        foreach ($applications as $application) {
            $mobileNumbers[] = $application->mobile_1_number;
            if ($application->mobile_2_number) {
                $mobileNumbers[] = $application->mobile_2_number;
            }
        }

        return response()->json([
            'success' => true,
            'data' => array_unique($mobileNumbers),
        ]);
    }
}