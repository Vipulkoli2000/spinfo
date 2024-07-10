<?php

namespace App\Models;

use App\Models\Profile;
use App\Models\Transaction;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Profile extends Model
{
   use HasFactory;

   public function transaction(){
      return $this->hasOne(Transaction::class, 'profile_id');
  }

  public static function updateWalletBalance(string $profile_id)
  {
       // select (sum(deposites) - sum(withdrawls)) as balance where profile_id = $profile_id
       // update wallet_balance in profiles table
       $profile = Profile::find($profile_id);

       if (!$profile) {
        return $this->sendError('Profile not found.', ['error'=>'Profile not found']);
       }

       $balance = Transaction::where('profile_id', $profile_id)
           ->sum('deposite') - Transaction::where('profile_id', $profile_id)
           ->sum('withdrawal');

        $profile->wallet_balance = $balance;
        $profile->save();

       // return $this->sendResponse(['profile'=>new ProfileResource($profile)], 'Wallet Balanace updated.');

  }
  
}
