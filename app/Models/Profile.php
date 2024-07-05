<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Profile extends Model
{
   use HasFactory;

   public function upateWalletBalance($profile_id)
   {
        // select (sum(deposites) - sum(withdrawls)) as balance where profile_id = $profile_id
        // update wallet_balance in profiles table
   }
}
