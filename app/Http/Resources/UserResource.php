<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Spatie\Permission\Models\Role;
use App\Http\Resources\ProfileResource;
use Illuminate\Http\Resources\Json\JsonResource;

class UserResource extends JsonResource
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
            'name' => $this->name,
            'email' => $this->email,
            'email_verified_at' => $this->email_verified_at,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
            'role' => $this->resource->roles->pluck('name')->toArray(), //another way of getting roles
            'profile' => new ProfileResource($this->whenLoaded('profile')),
        ]; 

    }
}
