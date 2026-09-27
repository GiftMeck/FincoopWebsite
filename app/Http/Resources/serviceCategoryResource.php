<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class serviceCategoryResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'category_id' => $this->category_id,
            'category_name' => $this->category_name,
            'category_description' => $this->category_description,
            'category_image' => $this->category_image,
        ];
    }
}
