<?php

// App/Services/ProfileNumberService.php;

namespace App\Services;

use App\Models\Profile;
use Illuminate\Support\Facades\DB;

class ProfileNumberService
{
    public static function generateProfileNumber(): string
    {
        // Get current month and year
        $currentMonth = date('m');
        $currentYear = date('y');
        
        // Formatted month and year
        $formattedMonthYear = $currentMonth . $currentYear;
        
        // Find the latest profile number for the current month and year
        $latestProfile = Profile::where('profile_no', 'like', $formattedMonthYear . '%')
                                ->orderBy('profile_no', 'desc')
                                ->first();
        
        // Increment the numeric part of the profile number
        if ($latestProfile) {
            $lastNumber = intval(substr($latestProfile->profile_no, 6)) + 1;
        } else {
            $lastNumber = 1;
        }
        
        // Format the new profile number
        $newProfileNumber = $formattedMonthYear . str_pad($lastNumber, 6, '0', STR_PAD_LEFT);
        
        return $newProfileNumber;
    }
}
