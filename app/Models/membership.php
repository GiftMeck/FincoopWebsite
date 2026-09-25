<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Membership extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $primaryKey = 'membership_id';
    protected $fillable = [
        // Personal Details
        'title',
        'surname',
        'first_name',
        'additional_name',
        'date_of_birth',
        'gender',
        'nationality',
        'marital_status',
        'id_type',
        'id_number',
        'income_source',
        'occupation',
        'qualification',
        'number_of_dependants',

        // Address / Contact
        'village',
        'traditional_authority',
        'district',
        'physical_address',
        'mailing_address',
        'telephone',
        'cell_phone',
        'email',

        // Employment
        'employer_name',
        'employer_address',
        'employer_telephone',
        'employer_fax_number',

        // Monthly Deduction
        'employment_number',
        'monthly_shares',
        'monthly_savings_ps',

        // Beneficiaries / Nominees
        'beneficiary_1_name',
        'beneficiary_1_relationship',
        'beneficiary_1_birth_date_percentage',
        'beneficiary_2_name',
        'beneficiary_2_relationship',
        'beneficiary_2_birth_date_percentage',
        'beneficiary_3_name',
        'beneficiary_3_relationship',
        'beneficiary_3_birth_date_percentage',

        // Referees
        'referee_name',
        'referee_occupation',
        'referee_address',
        'referee_phone_number',

        // Declaration
        'declaration_accepted',
        'applicant_signature',
        'thumb_print',
        'application_date',

        // Official Use Only
        'entrance_fee_paid_on',
        'entrance_fee_amount',
        'receipt_number',
        'completed_by',
        'completed_date',
        'date_of_admission',
        'approved_disapproved_by',
        'branch_manager',
        'official_date',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'date_of_birth' => 'date',
        'application_date' => 'date',
        'entrance_fee_paid_on' => 'date',
        'completed_date' => 'date',
        'date_of_admission' => 'date',
        'official_date' => 'date',
        'number_of_dependants' => 'integer',
        'monthly_shares' => 'decimal:2',
        'monthly_savings_ps' => 'decimal:2',
        'entrance_fee_amount' => 'decimal:2',
        'declaration_accepted' => 'boolean',
    ];

    /**
     * Get the full name of the member.
     */
    public function getFullNameAttribute(): string
    {
        return trim($this->first_name . ' ' . $this->surname);
    }

    /**
     * Get the formatted date of birth.
     */
    public function getFormattedDateOfBirthAttribute(): string
    {
        return $this->date_of_birth ? $this->date_of_birth->format('d/m/Y') : '';
    }

    /**
     * Scope a query to only include approved memberships.
     */
    public function scopeApproved($query)
    {
        return $query->whereNotNull('date_of_admission');
    }

    /**
     * Scope a query to only include pending memberships.
     */
    public function scopePending($query)
    {
        return $query->whereNull('date_of_admission');
    }

    /**
     * Get the beneficiaries as a collection.
     */
    public function getBeneficiariesAttribute(): array
    {
        $beneficiaries = [];

        for ($i = 1; $i <= 3; $i++) {
            $name = $this->{"beneficiary_{$i}_name"};
            if ($name) {
                $beneficiaries[] = [
                    'name' => $name,
                    'relationship' => $this->{"beneficiary_{$i}_relationship"},
                    'birth_date_percentage' => $this->{"beneficiary_{$i}_birth_date_percentage"},
                ];
            }
        }

        return $beneficiaries;
    }
}