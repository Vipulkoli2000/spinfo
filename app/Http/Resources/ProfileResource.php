<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ProfileResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'user_id' => $this->user_id,
            'profile_no' => $this->profile_no,
            'name' => $this->name,
            'parent_id' => $this->parent_id,
            'ref_id' => $this->ref_id,
            'registration_date' => $this->registration_date,
            'expiry_date' => $this->expiry_date,
            'mobile' => $this->mobile,
            'pan' => $this->pan,
            'pan_verified' => $this->pan_verified,
            'address_1' => $this->address_1,
            'address_2' => $this->address_2,
            'city' => $this->city,
            'state' => $this->state,
            'pincode' => $this->pincode,
            'bank_name' => $this->bank_name,
            'account_name' => $this->account_name,
            'account_no' => $this->account_no,
            'ifsc' => $this->ifsc,
            'bank_verified' => $this->bank_verified,
            'business_name' => $this->business_name,
            'gstin' => $this->gstin,
            'gstin_verified' => $this->gstin_verified,
            'direct_count' => $this->direct_count,
            'level_1' => $this->level_1,
            'level_2' => $this->level_2,
            'level_3' => $this->level_3,
            'level_4' => $this->level_4,
            'level_5' => $this->level_5,
            'level_6' => $this->level_6,
            'level_7' => $this->level_7,
            'level_8' => $this->level_8,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    
    }
}
