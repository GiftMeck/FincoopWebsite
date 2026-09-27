<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class BranchResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'branch_id' => $this->branch_id,
            'branch_name' => $this->branch_name,
            'branch_address' => $this->branch_address,
            'branch_phone' => $this->branch_phone,
            'branch_email' => $this->branch_email
        ];
    }

    public function with($request)
    {
        return [
            
        ];
    }
}
