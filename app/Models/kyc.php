<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Builder;

class Kyc extends Model
{
    use HasFactory;

    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'kyc';
    protected $attributes = [
        'approval_status' => 'pending',
        'kyc_status' => 'pending',
        'declaration_accepted' => false,
    ];

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        // Personal Details
        'member_sacco_number',
        'member_phone_number',
        'id_type',
        'id_number',
        'surname',
        'first_names',
        'date_of_birth',
        'gender',
        'physical_address',
        'mailing_address',
        'home_address',
        'village',
        'traditional_authority',
        'district',
        'email',

        // Referees
        'referee_name',
        'referee_occupation',
        'referee_address',
        'referee_phone',

        // Declaration
        'declaration_accepted',

        // Official Use Only
        'cross_checked_comments',
        'completed_by',
        'date_completed',
        'date_kyc_update',
        'kyc_identification_number',
        'approved_by',
        'branch_manager_name',
        'approval_date',
        'approval_status',

        // KYC specific fields
        'kyc_status',
        'verified_at',
        'expires_at',
        'verification_notes',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'date_of_birth' => 'date',
        'date_completed' => 'date',
        'date_kyc_update' => 'date',
        'approval_date' => 'date',
        'verified_at' => 'datetime',
        'expires_at' => 'datetime',
        'declaration_accepted' => 'boolean',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    /**
     * Get the full name of the KYC applicant.
     */
    public function getFullNameAttribute(): string
    {
        return trim($this->first_names . ' ' . $this->surname);
    }

    /**
     * Get the formatted date of birth.
     */
    public function getFormattedDateOfBirthAttribute(): string
    {
        return $this->date_of_birth ? $this->date_of_birth->format('d/m/Y') : '';
    }

    /**
     * Check if KYC is verified.
     */
    public function isVerified(): bool
    {
        return $this->kyc_status === 'verified';
    }

    /**
     * Check if KYC is pending.
     */
    public function isPending(): bool
    {
        return $this->kyc_status === 'pending';
    }

    /**
     * Check if KYC is rejected.
     */
    public function isRejected(): bool
    {
        return $this->kyc_status === 'rejected';
    }

    /**
     * Check if KYC is expired.
     */
    public function isExpired(): bool
    {
        return $this->kyc_status === 'expired' || ($this->expires_at && $this->expires_at->isPast());
    }

    /**
     * Check if KYC is approved.
     */
    public function isApproved(): bool
    {
        return $this->approval_status === 'approved';
    }

    /**
     * Check if KYC is disapproved.
     */
    public function isDisapproved(): bool
    {
        return $this->approval_status === 'disapproved';
    }


    /**
     * Scope a query to only include verified KYC records.
     */
    public function scopeVerified(Builder $query): Builder
    {
        return $query->where('kyc_status', 'verified');
    }

    /**
     * Scope a query to only include pending KYC records.
     */
    public function scopePendingKyc(Builder $query): Builder
    {
        return $query->where('kyc_status', 'pending');
    }

    /**
     * Scope a query to only include rejected KYC records.
     */
    public function scopeRejectedKyc(Builder $query): Builder
    {
        return $query->where('kyc_status', 'rejected');
    }

    /**
     * Scope a query to only include expired KYC records.
     */
    public function scopeExpiredKyc(Builder $query): Builder
    {
        return $query->where('kyc_status', 'expired')
            ->orWhere('expires_at', '<', now());
    }

    /**
     * Scope a query to only include approved KYC records.
     */
    public function scopeApproved(Builder $query): Builder
    {
        return $query->where('approval_status', 'approved');
    }

    /**
     * Scope a query to only include pending approval KYC records.
     */
    public function scopePendingApproval(Builder $query): Builder
    {
        return $query->where('approval_status', 'pending');
    }

    /**
     * Scope a query to search KYC records.
     */
    public function scopeSearch(Builder $query, string $search): Builder
    {
        return $query->where(function ($q) use ($search) {
            $q->where('first_names', 'like', "%{$search}%")
              ->orWhere('surname', 'like', "%{$search}%")
              ->orWhere('member_sacco_number', 'like', "%{$search}%")
              ->orWhere('kyc_identification_number', 'like', "%{$search}%")
              ->orWhere('member_phone_number', 'like', "%{$search}%")
              ->orWhere('id_number', 'like', "%{$search}%")
              ->orWhere('email', 'like', "%{$search}%");
        });
    }

    /**
     * Scope a query to filter by district.
     */
    public function scopeInDistrict(Builder $query, string $district): Builder
    {
        return $query->where('district', $district);
    }

    /**
     * Scope a query to get recent KYC records.
     */
    public function scopeRecent(Builder $query, int $days = 30): Builder
    {
        return $query->whereDate('created_at', '>=', now()->subDays($days));
    }

    /**
     * Scope a query to get KYC records expiring soon.
     */
    public function scopeExpiringSoon(Builder $query, int $days = 30): Builder
    {
        return $query->where('kyc_status', 'verified')
            ->whereDate('expires_at', '<=', now()->addDays($days));
    }
}