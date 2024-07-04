<?php

namespace Database\Factories;

use App\Services\ProfileNumberService;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Profile>
 */
class ProfileFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'profile_no' => ProfileNumberService::generateProfileNumber(),
            'user_id' => 1,
        ];
    }
}
