<?php

// App/Services/ProfileNumberService.php;

namespace App\Services;

use App\Models\Profile;
use Illuminate\Support\Facades\DB;

class ProfileNumberService
{
    public static function generateProfileNumber(): string
    {
        // Find the latest profile number for the current month and year
        $latestProfile = Profile::where('profile_no', 'like', date('my') . '%')
                        ->orderBy('profile_no', 'DESC')
                        ->first();

        // Increment the numeric part of the profile number
        $lastNumber = 1;

        if ($latestProfile) {
            $lastNumber = intval(substr($latestProfile->profile_no, 6)) + 1;
        }

        return date('my') . str_pad($lastNumber, 6, '0', STR_PAD_LEFT);
    }
}
