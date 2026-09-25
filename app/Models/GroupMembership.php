<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Builder;

class GroupMembership extends Model
{
    use HasFactory;

    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'group_memberships';

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        // Group Details
        'group_name',
        'number_of_members_male',
        'number_of_members_female',
        'number_of_members_total',
        'date_of_registration',
        'registration_number',
        'registered_under',
        'business_type',
        'income_source',
        'place_of_operation',
        'trading_area',

        // Contact Person / Group Representatives
        'rep1_full_name',
        'rep1_id_number',
        'rep1_position',
        'rep1_telephone',
        'rep2_full_name',
        'rep2_id_number',
        'rep2_position',
        'rep2_telephone',
        'rep3_full_name',
        'rep3_id_number',
        'rep3_position',
        'rep3_telephone',

        // Group Address
        'group_mailing_address',
        'group_physical_address',

        // Recommendation
        'recommendation_centre_name',
        'recommendation_date',
        'leader1_name',
        'leader1_signature',
        'leader1_position',
        'leader2_name',
        'leader2_signature',
        'leader2_position',
        'leader3_name',
        'leader3_signature',
        'leader3_position',

        // Declaration
        'declaration_accepted',
        'chairperson_signature',
        'secretary_signature',
        'treasurer_signature',
        'application_date',

        // Official Use Only
        'cross_checked_comments',
        'entrance_fee_paid_on',
        'entrance_fee_amount',
        'receipt_number',
        'completed_by',
        'completed_date',
        'date_of_admission',
        'member_identification_number',
        'approved_disapproved_by',
        'branch_manager',
        'official_signature',
        'official_date',

        // Status
        'status',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'date_of_registration' => 'date',
        'recommendation_date' => 'date',
        'application_date' => 'date',
        'entrance_fee_paid_on' => 'date',
        'completed_date' => 'date',
        'date_of_admission' => 'date',
        'official_date' => 'date',
        'number_of_members_male' => 'integer',
        'number_of_members_female' => 'integer',
        'number_of_members_total' => 'integer',
        'entrance_fee_amount' => 'decimal:2',
        'declaration_accepted' => 'boolean',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    /**
     * Get the representatives as a collection.
     */
    public function getRepresentativesAttribute(): array
    {
        $representatives = [];

        for ($i = 1; $i <= 3; $i++) {
            $name = $this->{"rep{$i}_full_name"};
            if ($name) {
                $representatives[] = [
                    'full_name' => $name,
                    'id_number' => $this->{"rep{$i}_id_number"},
                    'position' => $this->{"rep{$i}_position"},
                    'telephone' => $this->{"rep{$i}_telephone"},
                ];
            }
        }

        return $representatives;
    }

    /**
     * Get the leaders as a collection.
     */
    public function getLeadersAttribute(): array
    {
        $leaders = [];

        for ($i = 1; $i <= 3; $i++) {
            $name = $this->{"leader{$i}_name"};
            if ($name) {
                $leaders[] = [
                    'name' => $name,
                    'signature' => $this->{"leader{$i}_signature"},
                    'position' => $this->{"leader{$i}_position"},
                ];
            }
        }

        return $leaders;
    }

    /**
     * Get the total number of members.
     */
    public function getTotalMembersAttribute(): int
    {
        return ($this->number_of_members_male ?? 0) + ($this->number_of_members_female ?? 0);
    }

    /**
     * Check if the group membership is approved.
     */
    public function isApproved(): bool
    {
        return $this->status === 'approved';
    }

    /**
     * Check if the group membership is pending.
     */
    public function isPending(): bool
    {
        return $this->status === 'pending';
    }

    /**
     * Check if the group membership is disapproved.
     */
    public function isDisapproved(): bool
    {
        return $this->status === 'disapproved';
    }

    /*
    |--------------------------------------------------------------------------
    | Scopes
    |--------------------------------------------------------------------------
    */

    /**
     * Scope a query to only include approved group memberships.
     */
    public function scopeApproved(Builder $query): Builder
    {
        return $query->where('status', 'approved');
    }

    /**
     * Scope a query to only include pending group memberships.
     */
    public function scopePending(Builder $query): Builder
    {
        return $query->where('status', 'pending');
    }

    /**
     * Scope a query to only include disapproved group memberships.
     */
    public function scopeDisapproved(Builder $query): Builder
    {
        return $query->where('status', 'disapproved');
    }

    /**
     * Scope a query to search group memberships.
     */
    public function scopeSearch(Builder $query, string $search): Builder
    {
        return $query->where(function ($q) use ($search) {
            $q->where('group_name', 'like', "%{$search}%")
              ->orWhere('registration_number', 'like', "%{$search}%")
              ->orWhere('member_identification_number', 'like', "%{$search}%")
              ->orWhere('rep1_full_name', 'like', "%{$search}%")
              ->orWhere('rep2_full_name', 'like', "%{$search}%")
              ->orWhere('rep3_full_name', 'like', "%{$search}%")
              ->orWhere('trading_area', 'like', "%{$search}%");
        });
    }

    /**
     * Scope a query to filter by business type.
     */
    public function scopeOfBusinessType(Builder $query, string $type): Builder
    {
        return $query->where('business_type', $type);
    }

    /**
     * Scope a query to get recent group memberships.
     */
    public function scopeRecent(Builder $query, int $days = 30): Builder
    {
        return $query->whereDate('created_at', '>=', now()->subDays($days));
    }
}