<?php

namespace App\Http\Controllers\Api;

use Carbon\Carbon;
use App\Models\Profile;
use App\Models\Transaction;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use App\Services\ProfileNumberService;
use App\Http\Resources\ProfileResource;
use App\Http\Controllers\Api\BaseController;

class PaymentController extends BaseController
{
     /**
     *  Show Payment
     */
    public function payment(string $id): JsonResponse
    {
        // Update profiles table with registration_date, expiry_date (registration_date + 1 year - 1 day) and profile_no

        $profile = Profile::find($id);
        if (!$profile) {
            return $this->sendError('Profile not found.', ['error'=>'Profile not found']);
         }

         $user = Auth::user();
         if($user->profile->id !== $profile->id){
            return $this->sendError('Unauthorized', ['error'=>'You are not allowed to Pay']);
          }
        $profile->registration_date = Carbon::now()->format('Y-m-d');
        $profile->expiry_date = Carbon::parse($profile->registration_date)
            ->addYear()
            ->subDay()
            ->format('Y-m-d');

        $profile->profile_no = ProfileNumberService::generateProfileNumber();
        $profile->save();

        $refProfile = Profile::find($profile->ref_id);
        $refProfile->direct_count = $refProfile->direct_count + 1;
        $refProfile->save();

        $parentId = $profile->parent_id;

        if($parentId) {
            $parentProfile1 = Profile::find($parentId);
            $parentProfile1->level_1 = $parentProfile1->level_1 + 1;
            $parentProfile1->save();

            Transaction::insertDeposit($parentId, 100);

            // $transaction = new Transaction();
            // $transaction->insertDeposite($parentId, 100);

            //$transaction = Transaction::find($parentProfile1->transaction->id);
            if($parentProfile1->transaction){
              $parentProfile1->transaction->deposite += 100;
              $parentProfile1->transaction->transaction_date = date("Y-m-d");
              $parentProfile1->transaction->save();
            }
            else{
                $newTransaction = new Transaction();
                $newTransaction->profile_id = $parentProfile1->id;
                $newTransaction->deposite = 100;
                $newTransaction->transaction_date = date("Y-m-d");
                $newTransaction->save();
            }
            $this->updateWalletBalance($parentProfile1->id);
            $parentId = $parentProfile1->parent_id;
        }

        if($parentId) {
            $parentProfile2 = Profile::find($parentId);
            $parentProfile2->level_2 = $parentProfile2->level_2 + 1;
            $parentProfile2->save();

            if($parentProfile2->transaction){
                $parentProfile2->transaction->deposite += 100;
                $parentProfile2->transaction->transaction_date = date("Y-m-d");
                $parentProfile2->transaction->save();
              }
            else{
                $newTransaction = new Transaction();
                $newTransaction->profile_id = $parentProfile2->id;
                $newTransaction->deposite = 100;
                $newTransaction->transaction_date = date("Y-m-d");
                $newTransaction->save();
            }
            $this->updateWalletBalance($parentProfile2->id);
            $parentId = $parentProfile2->parent_id;
        }

        if($parentId){
            $parentProfile3 = Profile::find($parentProfile2->parent_id);
            $parentProfile3->level_3 = $parentProfile3->level_3 + 1;
            $parentProfile3->save();

            if($parentProfile3->transaction){
                $parentProfile3->transaction->deposite += 100;
                $parentProfile3->transaction->transaction_date = date("Y-m-d");
                $parentProfile3->transaction->save();
              }
            else{
                $newTransaction = new Transaction();
                $newTransaction->profile_id = $parentProfile3->id;
                $newTransaction->deposite = 100;
                $newTransaction->transaction_date = date("Y-m-d");
                $newTransaction->save();
            }
            $this->updateWalletBalance($parentProfile3->id);
            $parentId = $parentProfile3->parent_id;
        }

        if($parentId){
            $parentProfile4 = Profile::find($parentProfile3->parent_id);
            $parentProfile4->level_4 = $parentProfile4->level_4 + 1;
            $parentProfile4->save();

            if($parentProfile4->transaction){
                $parentProfile4->transaction->deposite += 100;
                $parentProfile4->transaction->transaction_date = date("Y-m-d");
                $parentProfile4->transaction->save();
              }
            else{
                $newTransaction = new Transaction();
                $newTransaction->profile_id = $parentProfile4->id;
                $newTransaction->deposite = 100;
                $newTransaction->transaction_date = date("Y-m-d");
                $newTransaction->save();
            }
            $this->updateWalletBalance($parentProfile4->id);
            $parentId = $parentProfile4->parent_id;
        }

        if($parentId){
            $parentProfile5 = Profile::find($parentProfile4->parent_id);
            $parentProfile5->level_5 = $parentProfile5->level_5 + 1;
            $parentProfile5->save();

            if($parentProfile5->transaction){
                $parentProfile5->transaction->deposite += 100;
                $parentProfile5->transaction->transaction_date = date("Y-m-d");
                $parentProfile5->transaction->save();
              }
            else{
                $newTransaction = new Transaction();
                $newTransaction->profile_id = $parentProfile5->id;
                $newTransaction->deposite = 100;
                $newTransaction->transaction_date = date("Y-m-d");
                $newTransaction->save();
            }
            $this->updateWalletBalance($parentProfile5->id);
            $parentId = $parentProfile5->parent_id;
        }

        if($parentId){
            $parentProfile6 = Profile::find($parentProfile5->parent_id);
            $parentProfile6->level_6 = $parentProfile6->level_6 + 1;
            $parentProfile6->save();

            if($parentProfile6->transaction){
                $parentProfile6->transaction->deposite += 100;
                $parentProfile6->transaction->transaction_date = date("Y-m-d");
                $parentProfile6->transaction->save();
              }
            else{
                $newTransaction = new Transaction();
                $newTransaction->profile_id = $parentProfile6->id;
                $newTransaction->deposite = 100;
                $newTransaction->transaction_date = date("Y-m-d");
                $newTransaction->save();
            }
            $this->updateWalletBalance($parentProfile6->id);
            $parentId = $parentProfile6->parent_id;
        }

        if($parentId){
            $parentProfile7 = Profile::find($parentProfile6->parent_id);
            $parentProfile7->level_7 = $parentProfile7->level_7 + 1;
            $parentProfile7->save();

            if($parentProfile7->transaction){
                $parentProfile7->transaction->deposite += 100;
                $parentProfile7->transaction->transaction_date = date("Y-m-d");
                $parentProfile7->transaction->save();
              }
            else{
                $newTransaction = new Transaction();
                $newTransaction->profile_id = $parentProfile7->id;
                $newTransaction->deposite = 100;
                $newTransaction->transaction_date = date("Y-m-d");
                $newTransaction->save();
            }
            $this->updateWalletBalance($parentProfile7->id);
            $parentId = $parentProfile7->parent_id;
        }

        if($parentId){
            $parentProfile8 = Profile::find($parentProfile7->parent_id);
            $parentProfile8->level_8 = $parentProfile8->level_8 + 1;
            $parentProfile8->save();

            if($parentProfile8->transaction){
                $parentProfile8->transaction->deposite += 100;
                $parentProfile8->transaction->transaction_date = date("Y-m-d");
                $parentProfile8->transaction->save();
              }
            else{
                $newTransaction = new Transaction();
                $newTransaction->profile_id = $parentProfile8->id;
                $newTransaction->deposite = 100;
                $newTransaction->transaction_date = date("Y-m-d");
                $newTransaction->save();
            }
            $this->updateWalletBalance($parentProfile8->id);
        }

        /**
         * Add wallet_balance decimal (12,2) default 0 field in profiles table at the end done
         * Add transactions table id, profile_id, t_date, deposite, withdrawal columns  done
         * Add Rs. 100 entry in transactions table done
         * create updateWalletBalance function in Profile.php
         * In seed add Admin User with admin role and top@spinfo with profile with member role
         * While registerting user is always a member
         */

        return $this->sendResponse(['profile'=>new ProfileResource($profile)], 'Profile retrieved successfully.');
    }

    public function updateWalletBalance(string $profile_id)
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

         return $this->sendResponse(['profile'=>new ProfileResource($profile)], 'Wallet Balanace updated.');

   }

}
