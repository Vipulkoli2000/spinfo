<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Transaction extends Model
{
    use HasFactory;

    public static function insertDeposit($profile_id, $amount) {
       // dd($profile_id);
       // self::
       // $transaction = new self::class;
       $transaction = new static;
       $transaction->profile_id = $profile_id;
       $transaction->deposite =  $amount;
       $transaction->transaction_date = date("Y-m-d");
       $transaction->save();
    }
}

