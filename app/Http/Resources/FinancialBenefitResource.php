<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class FinancialBenefitResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'benefit_id' => $this->benefit_id,
            'benefit_name' => $this->benefit_name,
            'benefit_description' => $this->benefit_description,
        ];
    }
}
