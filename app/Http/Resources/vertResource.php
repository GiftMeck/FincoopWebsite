<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class vertResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'advert_id' => $this->advert_id,
            'advert_title' => $this->advert_title,
            'advert_description' => $this->advert_description,
            'advert_image' => $this->advert_image,
            'advert_link' => $this->advert_link,
        ];
    }
}
