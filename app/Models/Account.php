<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;

class Account extends Model
{
    protected $table = 'accounts';

    protected $primaryKey = 'id';

    protected $fillable = [
        'account_number',
        'branch',
        'salutation',
        'full_name',
        'id_type',
        'id_number',
        'gender',
        'year_of_birth',
        'marital_status',
        'mobile',
        'email',
        'entry_date',
        'employer',
        'job_number',
        'relationship_manager',
        'membership_status',
        'account_status',
        'import_batch',
    ];

    /**
     * Mapping of accepted Excel header variants (case-insensitive, spaces /
     * underscores ignored) to the model's clean column names. This lets the
     * importer tolerate the messy, inconsistent headers in the source file.
     */
    public const HEADER_MAP = [
        'branch' => 'branch',
        'baseno' => 'account_number',
        'base' => 'account_number',
        'accountnumber' => 'account_number',
        'salutation' => 'salutation',
        'fullname' => 'full_name',
        'name' => 'full_name',
        'idtype' => 'id_type',
        'idno' => 'id_number',
        'idnumber' => 'id_number',
        'gende' => 'gender',
        'gender' => 'gender',
        'yearbirth' => 'year_of_birth',
        'yearofbirth' => 'year_of_birth',
        'maritalstatus' => 'marital_status',
        'mobile' => 'mobile',
        'email' => 'email',
        'entrydate' => 'entry_date',
        'employer' => 'employer',
        'jobnumber' => 'job_number',
        'relationshipmanager' => 'relationship_manager',
        'membershipstatus' => 'membership_status',
        'accountstatus' => 'account_status',
    ];

    /**
     * Determine whether an account number exists (and is valid) in the
     * imported member data. Used to enforce loan / KYC validation.
     */
    public static function existsForAccountNumber(?string $accountNumber): bool
    {
        if ($accountNumber === null || trim($accountNumber) === '') {
            return false;
        }

        return static::query()
            ->whereRaw('LOWER(TRIM(account_number)) = ?', [strtolower(trim($accountNumber))])
            ->exists();
    }

    /**
     * Scope a query to search across the common member fields.
     */
    public function scopeSearch(Builder $query, string $search): Builder
    {
        return $query->where(function ($q) use ($search) {
            $q->where('account_number', 'like', "%{$search}%")
                ->orWhere('full_name', 'like', "%{$search}%")
                ->orWhere('id_number', 'like', "%{$search}%")
                ->orWhere('mobile', 'like', "%{$search}%")
                ->orWhere('email', 'like', "%{$search}%")
                ->orWhere('branch', 'like', "%{$search}%");
        });
    }
    public const ACTIVE_STATUSES = ['pending', 'under_review', 'approved'];

    /**
     * Does the given account number currently have a loan in progress?
     */
    public static function hasActiveLoanFor(?string $accountNumber): bool
    {
        $normalized = strtolower(trim((string) $accountNumber));

        if ($normalized === '') {
            return false;
        }

        return static::query()
            ->whereRaw('LOWER(TRIM(account_number)) = ?', [$normalized])
            ->whereIn('status', self::ACTIVE_STATUSES)
            ->exists();
    }
}
