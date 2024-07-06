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

  
}
