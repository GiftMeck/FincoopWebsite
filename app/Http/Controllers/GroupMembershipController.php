<?php

namespace App\Http\Controllers;

use App\Models\GroupMembership;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;
use Inertia\Inertia;

class GroupMembershipController extends Controller
{
    /**
     * Display a listing of group memberships.
     */
    public function index(Request $request)
    {
        $query = GroupMembership::query();

        // Search
        if ($request->has('search') && $request->search) {
            $query->search($request->search);
        }

        // Filter by status
        if ($request->has('status') && $request->status) {
            switch ($request->status) {
                case 'approved':
                    $query->approved();
                    break;
                case 'pending':
                    $query->pending();
                    break;
                case 'disapproved':
                    $query->disapproved();
                    break;
            }
        }

        // Filter by business type
        if ($request->has('business_type') && $request->business_type) {
            $query->ofBusinessType($request->business_type);
        }

        // Filter by date range
        if ($request->has('from_date') && $request->from_date) {
            $query->whereDate('created_at', '>=', $request->from_date);
        }
        if ($request->has('to_date') && $request->to_date) {
            $query->whereDate('created_at', '<=', $request->to_date);
        }

        $groupMemberships = $query->latest()->paginate($request->per_page ?? 15);

        return response()->json([
            'success' => true,
            'data' => $groupMemberships,
        ]);
    }
    /**
     * Display the form to create a new group membership.
     */
    public function create(){
        return Inertia::render('GroupMembership/Create');
    }
    /**
     * Store a newly created group membership.
     */
    public function store(Request $request)
    {
        $validator = $this->validateGroupMembership($request);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'errors' => $validator->errors(),
            ], 422);
        }

        // Generate member identification number if not provided
        $data = $validator->validated();
        if (empty($data['member_identification_number'])) {
            $data['member_identification_number'] = $this->generateMemberNumber();
        }

        // Calculate total members if not provided
        if (empty($data['number_of_members_total'])) {
            $data['number_of_members_total'] = ($data['number_of_members_male'] ?? 0) + ($data['number_of_members_female'] ?? 0);
        }

        $groupMembership = GroupMembership::create($data);
        return redirect()
        ->back()
        ->with('success', 'Group membership application submitted successfully.');
    }

    /**
     * Display the specified group membership.
     */
    public function show(GroupMembership $groupMembership)
    {
        return Inertia::render('GroupMembership/Show', ['groupMembershipApplicant' => $groupMembership]);
    }

    /**
     * Update the specified group membership.
     */
    public function update(Request $request, GroupMembership $groupMembership)
    {
        $validator = $this->validateGroupMembership($request, $groupMembership->id);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'errors' => $validator->errors(),
            ], 422);
        }

        // Recalculate total members if male/female counts changed
        $data = $validator->validated();
        if (isset($data['number_of_members_male']) || isset($data['number_of_members_female'])) {
            $male = $data['number_of_members_male'] ?? $groupMembership->number_of_members_male ?? 0;
            $female = $data['number_of_members_female'] ?? $groupMembership->number_of_members_female ?? 0;
            $data['number_of_members_total'] = $male + $female;
        }

        $groupMembership->update($data);

        return response()->json([
            'success' => true,
            'message' => 'Group membership updated successfully.',
            'data' => $groupMembership,
        ]);
    }

    /**
     * Remove the specified group membership.
     */
    public function destroy(GroupMembership $groupMembership)
    {
        $groupMembership->delete();

        return response()->json([
            'success' => true,
            'message' => 'Group membership deleted successfully.',
        ]);
    }

    /**
     * Approve a group membership.
     */
    public function approve(Request $request, GroupMembership $groupMembership)
    {
        $validated = $request->validate([
            'cross_checked_comments' => 'nullable|string',
            'entrance_fee_paid_on' => 'nullable|date',
            'entrance_fee_amount' => 'nullable|numeric|min:0',
            'receipt_number' => 'nullable|string|max:100',
            'completed_by' => 'nullable|string|max:255',
            'completed_date' => 'nullable|date',
            'date_of_admission' => 'nullable|date',
            'member_identification_number' => 'nullable|string|max:100|unique:group_memberships,member_identification_number,' . $groupMembership->id,
            'approved_disapproved_by' => 'nullable|string|max:255',
            'branch_manager' => 'nullable|string|max:255',
            'official_signature' => 'nullable|string|max:255',
            'official_date' => 'nullable|date',
        ]);

        $validated['status'] = 'approved';
        $validated['date_of_admission'] = $validated['date_of_admission'] ?? now()->toDateString();
        $validated['official_date'] = $validated['official_date'] ?? now()->toDateString();

        $groupMembership->update($validated);

        return redirect()
            ->route('group-memberships.index')
            ->with('success', 'Group membership approved successfully.');
    }

    /**
     * Disapprove a group membership.
     */
    public function disapprove(Request $request, GroupMembership $groupMembership)
    {
        $request->validate([
            'approved_disapproved_by' => 'required|string|max:255',
            'disapproval_reason' => 'nullable|string|max:1000',
        ]);

        $groupMembership->update([
            'status' => 'disapproved',
            'approved_disapproved_by' => $request->approved_disapproved_by,
            'official_date' => now()->toDateString(),
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Group membership disapproved.',
            'data' => $groupMembership,
        ]);
    }

    /**
     * Validate the group membership request.
     */
    private function validateGroupMembership(Request $request, ?int $id = null)
    {
        $rules = [
            // Group Details
            'group_name' => 'required|string|max:255',
            'number_of_members_male' => 'nullable|integer|min:0',
            'number_of_members_female' => 'nullable|integer|min:0',
            'number_of_members_total' => 'nullable|integer|min:0',
            'date_of_registration' => 'nullable|date',
            'registration_number' => 'nullable|string|max:100',
            'registered_under' => 'nullable|string|max:255',
            'business_type' => 'nullable|string|max:255',
            'income_source' => 'nullable|string|max:255',
            'place_of_operation' => 'nullable|string|max:255',
            'trading_area' => 'nullable|string|max:255',

            // Contact Person / Group Representatives
            'rep1_full_name' => 'nullable|string|max:255',
            'rep1_id_number' => 'nullable|string|max:100',
            'rep1_position' => 'nullable|string|max:255',
            'rep1_telephone' => 'nullable|string|max:20',

            'rep2_full_name' => 'nullable|string|max:255',
            'rep2_id_number' => 'nullable|string|max:100',
            'rep2_position' => 'nullable|string|max:255',
            'rep2_telephone' => 'nullable|string|max:20',

            'rep3_full_name' => 'nullable|string|max:255',
            'rep3_id_number' => 'nullable|string|max:100',
            'rep3_position' => 'nullable|string|max:255',
            'rep3_telephone' => 'nullable|string|max:20',

            // Group Address
            'group_mailing_address' => 'nullable|string',
            'group_physical_address' => 'nullable|string',

            // Recommendation
            'recommendation_centre_name' => 'nullable|string|max:255',
            'recommendation_date' => 'nullable|date',

            'leader1_name' => 'nullable|string|max:255',
            'leader1_signature' => 'nullable|string|max:255',
            'leader1_position' => 'nullable|string|max:255',

            'leader2_name' => 'nullable|string|max:255',
            'leader2_signature' => 'nullable|string|max:255',
            'leader2_position' => 'nullable|string|max:255',

            'leader3_name' => 'nullable|string|max:255',
            'leader3_signature' => 'nullable|string|max:255',
            'leader3_position' => 'nullable|string|max:255',

            // Declaration
            'declaration_accepted' => 'required|accepted',
            'chairperson_signature' => 'required|string|max:255',
            'secretary_signature' => 'required|string|max:255',
            'treasurer_signature' => 'required|string|max:255',
            'application_date' => 'required|date',

            // Official Use Only
            'cross_checked_comments' => 'nullable|string',
            'entrance_fee_paid_on' => 'nullable|date',
            'entrance_fee_amount' => 'nullable|numeric|min:0',
            'receipt_number' => 'nullable|string|max:100',
            'completed_by' => 'nullable|string|max:255',
            'completed_date' => 'nullable|date',
            'date_of_admission' => 'nullable|date',
            'member_identification_number' => 'nullable|string|max:100|unique:group_memberships,member_identification_number,' . ($id ?? 'NULL'),
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
    private function generateMemberNumber(): string
    {
        $prefix = 'GRP';
        $year = date('Y');
        $lastGroup = GroupMembership::latest('id')->first();
        $number = $lastGroup ? str_pad($lastGroup->id + 1, 6, '0', STR_PAD_LEFT) : '000001';

        return $prefix . $year . $number;
    }

    /**
     * Get group membership statistics.
     */
    public function statistics()
    {
        $total = GroupMembership::count();
        $approved = GroupMembership::approved()->count();
        $pending = GroupMembership::pending()->count();
        $disapproved = GroupMembership::disapproved()->count();

        // Business type breakdown
        $businessTypes = GroupMembership::select('business_type')
            ->selectRaw('count(*) as count')
            ->whereNotNull('business_type')
            ->groupBy('business_type')
            ->get()
            ->pluck('count', 'business_type')
            ->toArray();

        // Monthly registrations for the last 12 months
        $monthly = GroupMembership::selectRaw('DATE_FORMAT(created_at, "%Y-%m") as month')
            ->selectRaw('count(*) as count')
            ->whereDate('created_at', '>=', now()->subMonths(12))
            ->groupBy('month')
            ->orderBy('month')
            ->get()
            ->pluck('count', 'month')
            ->toArray();

        // Total members across all groups
        $totalMembers = GroupMembership::sum('number_of_members_total');

        return response()->json([
            'success' => true,
            'data' => [
                'total_groups' => $total,
                'approved' => $approved,
                'pending' => $pending,
                'disapproved' => $disapproved,
                'total_members' => $totalMembers,
                'approval_rate' => $total > 0 ? round(($approved / $total) * 100, 2) : 0,
                'business_types' => $businessTypes,
                'monthly_registrations' => $monthly,
            ],
        ]);
    }

    /**
     * Export group memberships to CSV.
     */
    public function export(Request $request)
    {
        /*
        $query = GroupMembership::query();

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

        $groupMemberships = $query->get();
        */

        $groupMemberships = GroupMembership::all();
        $headers = [
            'Content-Type' => 'text/csv',
            'Content-Disposition' => 'attachment; filename="group_memberships_' . date('Y-m-d') . '.csv"',
        ];

        $callback = function () use ($groupMemberships) {
            $handle = fopen('php://output', 'w');

            // Headers
            fputcsv($handle, [
                'ID', 'Group Name', 'Member Number', 'Total Members', 'Male', 'Female',
                'Registration No.', 'Business Type', 'Trading Area',
                'Status', 'Approved By', 'Approval Date', 'Created At'
            ]);

            // Data
            foreach ($groupMemberships as $group) {
                fputcsv($handle, [
                    $group->id,
                    $group->group_name,
                    $group->member_identification_number ?? 'N/A',
                    $group->number_of_members_total ?? 0,
                    $group->number_of_members_male ?? 0,
                    $group->number_of_members_female ?? 0,
                    $group->registration_number ?? 'N/A',
                    $group->business_type ?? 'N/A',
                    $group->trading_area ?? 'N/A',
                    $group->status,
                    $group->approved_disapproved_by ?? 'N/A',
                    $group->official_date ?? 'N/A',
                    $group->created_at,
                ]);
            }

            fclose($handle);
        };

        return response()->stream($callback, 200, $headers);
    }

    /**
     * Generate a member number (public endpoint).
     */
    public function generateMemberNumberPublic()
    {
        return response()->json([
            'success' => true,
            'member_number' => $this->generateMemberNumber(),
        ]);
    }

    /**
     * Get business types list with group counts.
     */
    public function businessTypes()
    {
        $businessTypes = GroupMembership::select('business_type')
            ->selectRaw('count(*) as count')
            ->whereNotNull('business_type')
            ->groupBy('business_type')
            ->orderBy('business_type')
            ->get();

        return response()->json([
            'success' => true,
            'data' => $businessTypes,
        ]);
    }

    /**
     * Bulk approve group memberships.
     */
    public function bulkApprove(Request $request)
    {
        $request->validate([
            'ids' => 'required|array',
            'ids.*' => 'exists:group_memberships,id',
            'approved_disapproved_by' => 'required|string|max:255',
            'branch_manager' => 'required|string|max:255',
            'official_signature' => 'required|string|max:255',
        ]);

        $count = GroupMembership::whereIn('id', $request->ids)
            ->where('status', 'pending')
            ->update([
                'status' => 'approved',
                'approved_disapproved_by' => $request->approved_disapproved_by,
                'branch_manager' => $request->branch_manager,
                'official_signature' => $request->official_signature,
                'official_date' => now()->toDateString(),
                'date_of_admission' => now()->toDateString(),
            ]);

        return response()->json([
            'success' => true,
            'message' => "{$count} group memberships approved successfully.",
            'count' => $count,
        ]);
    }

    /**
     * Get summary of a specific group.
     */
    public function summary(GroupMembership $groupMembership)
    {
        return response()->json([
            'success' => true,
            'data' => [
                'group_name' => $groupMembership->group_name,
                'member_identification_number' => $groupMembership->member_identification_number,
                'total_members' => $groupMembership->number_of_members_total,
                'representatives' => $groupMembership->representatives,
                'leaders' => $groupMembership->leaders,
                'status' => $groupMembership->status,
                'date_of_admission' => $groupMembership->date_of_admission,
                'created_at' => $groupMembership->created_at,
            ],
        ]);
    }
}