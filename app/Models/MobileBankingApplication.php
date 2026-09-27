<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Builder;

class MobileBankingApplication extends Model
{
    use HasFactory;

    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'mobile_banking_applications';

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        // Request & Customer Details
        'request_type',
        'title',
        'first_name',
        'surname',
        'id_type',
        'id_number',
        'cell_phone',
        'sacc_number_employment',
        'email',
        'postal_address',

        // Linked Mobile Phone
        'add_mobile_number',
        'remove_mobile_number',
        'mobile_1_number',
        'mobile_1_sms_notification',
        'mobile_2_number',
        'mobile_2_sms_notification',

        // Services
        'balance_savings',
        'balance_loans',
        'balance_other',
        'balance_other_specify',
        'funds_transfer',

        // Declaration
        'declaration_accepted',
        'signature',
        'declaration_date',

        // Office Use Only
        'member_customer_number',
        'received_by',
        'received_date',
        'approved_by',
        'approved_date',
        'processed_by',
        'processed_date',

        // Status
        'status',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'add_mobile_number' => 'boolean',
        'remove_mobile_number' => 'boolean',
        'balance_savings' => 'boolean',
        'balance_loans' => 'boolean',
        'balance_other' => 'boolean',
        'funds_transfer' => 'boolean',
        'declaration_accepted' => 'boolean',
        'declaration_date' => 'date',
        'received_date' => 'date',
        'approved_date' => 'date',
        'processed_date' => 'date',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    /**
     * Get the full name of the applicant.
     */
    public function getFullNameAttribute(): string
    {
        return trim($this->title . ' ' . $this->first_name . ' ' . $this->surname);
    }

    /**
     * Get the selected services as an array.
     */
    public function getSelectedServicesAttribute(): array
    {
        $services = [];

        if ($this->balance_savings) {
            $services[] = 'Balance Savings';
        }
        if ($this->balance_loans) {
            $services[] = 'Balance Loans';
        }
        if ($this->balance_other) {
            $services[] = 'Balance Other: ' . ($this->balance_other_specify ?? 'Not specified');
        }
        if ($this->funds_transfer) {
            $services[] = 'Funds Transfer';
        }

        return $services;
    }

    /**
     * Get the mobile numbers as an array.
     */
    public function getMobileNumbersAttribute(): array
    {
        $numbers = [$this->mobile_1_number];
        if ($this->mobile_2_number) {
            $numbers[] = $this->mobile_2_number;
        }
        return $numbers;
    }

    /**
     * Check if the application is pending.
     */
    public function isPending(): bool
    {
        return $this->status === 'pending';
    }

    /**
     * Check if the application is approved.
     */
    public function isApproved(): bool
    {
        return $this->status === 'approved';
    }

    /**
     * Check if the application is rejected.
     */
    public function isRejected(): bool
    {
        return $this->status === 'rejected';
    }

    /**
     * Check if the application is processed.
     */
    public function isProcessed(): bool
    {
        return $this->status === 'processed';
    }

    /*
    Scopes
    */

    /**
     * Scope a query to only include pending applications.
     */
    public function scopePending(Builder $query): Builder
    {
        return $query->where('status', 'pending');
    }

    /**
     * Scope a query to only include approved applications.
     */
    public function scopeApproved(Builder $query): Builder
    {
        return $query->where('status', 'approved');
    }

    /**
     * Scope a query to only include rejected applications.
     */
    public function scopeRejected(Builder $query): Builder
    {
        return $query->where('status', 'rejected');
    }

    /**
     * Scope a query to only include processed applications.
     */
    public function scopeProcessed(Builder $query): Builder
    {
        return $query->where('status', 'processed');
    }

    /**
     * Scope a query to only include applications by request type.
     */
    public function scopeOfRequestType(Builder $query, string $type): Builder
    {
        return $query->where('request_type', $type);
    }

    /**
     * Scope a query to search applications.
     */
    public function scopeSearch(Builder $query, string $search): Builder
    {
        return $query->where(function ($q) use ($search) {
            $q->where('first_name', 'like', "%{$search}%")
              ->orWhere('surname', 'like', "%{$search}%")
              ->orWhere('cell_phone', 'like', "%{$search}%")
              ->orWhere('sacc_number_employment', 'like', "%{$search}%")
              ->orWhere('email', 'like', "%{$search}%")
              ->orWhere('member_customer_number', 'like', "%{$search}%");
        });
    }

    /**
     * Scope a query to include applications with mobile banking services.
     */
    public function scopeHasServices(Builder $query): Builder
    {
        return $query->where(function ($q) {
            $q->where('balance_savings', true)
              ->orWhere('balance_loans', true)
              ->orWhere('balance_other', true)
              ->orWhere('funds_transfer', true);
        });
    }
}