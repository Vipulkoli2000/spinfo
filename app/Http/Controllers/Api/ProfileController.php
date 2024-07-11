<?php

namespace App\Http\Controllers\Api;

use Carbon\Carbon;
use App\Models\User;
use App\Models\Profile;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use App\Services\ProfileNumberService;
use App\Http\Resources\ProfileResource;
use App\Http\Requests\UpdateProfileRequest;
use App\Http\Controllers\Api\BaseController;

  /**
     * @group Profile Management
     *
     * API for Managing Profile data
     */

class ProfileController extends BaseController
{

     /**
     *  Show Profile
     */
    public function show(string $id): JsonResponse
    {
        $profile = Profile::find($id);

        if (!$profile) {
            return $this->sendError('Profile not found.', ['error'=>'Profile not found']);
        }
        $user = Auth::user();
        if($user->id !== $profile->user_id){
            return $this->sendError('Unauthorized', ['error'=>'You are not allowed to view this profile.']);
        }
        return $this->sendResponse(['profile'=>new ProfileResource($profile)], 'Profile retrieved successfully.');
    }


     /**
     * Update Profile
     * @bodyParam name string The name of the user.
     * @bodyParam mobile string The mobile number of the user.
     * @bodyParam pan string The pan number of the user.
     * @bodyParam address_1 string The address_1 of the user.
     * @bodyParam address_2 string The address_1 of the user.
     * @bodyParam city string The city of the user.
     * @bodyParam state string The state of the user.
     * @bodyParam pincode string The pincode of the user.
     * @bodyParam bank_name string The bank name of the user.
     * @bodyParam account_name string The account name of the user.
     * @bodyParam account_no string The account number of the user.
     * @bodyParam ifsc string The ifsc number of the user.
     * @bodyParam business_name string The business_name of the user.
     * @bodyParam gstin string The gstin of the user.
     */
    public function update(UpdateProfileRequest $request, string $id): JsonResponse
    {
        $profile = Profile::find($id);
        $user = User::find($profile->user_id);
        if ($user->hasPermissionTo('update profile')) {
            // User can edit posts
            
            // if(!$profile){
            //     return $this->sendError('Profile Not Found', ['error'=>'Profile not found']);
            // }
            // $user = Auth::user();
            // if($user->id !== $profile->user_id){
            //     return $this->sendError('Unauthorized', ['error'=>'You are not allowed to update this profile.']);
            // }
    
            $profile->name = $request->input('name');
            $profile->mobile = $request->input('mobile');
            $profile->pan = $request->input('pan');
            $profile->parent_id = $request->input('parent_id');
            $profile->ref_id = $request->input('ref_id');
            $profile->registration_date = $request->input('registration_date');
            $profile->address_1 = $request->input('address_1');
            $profile->address_2 = $request->input('address_2');
            $profile->city = $request->input('city');
            $profile->state = $request->input('state');
            $profile->pincode = $request->input('pincode');
            $profile->bank_name = $request->input('bank_name');
            $profile->account_name = $request->input('account_name');
            $profile->account_no = $request->input('account_no');
            $profile->ifsc = $request->input('ifsc');
            $profile->business_name = $request->input('business_name');
            $profile->gstin = $request->input('gstin');
            $profile->save();
    
            return $this->sendResponse(['Profile'=>new ProfileResource($profile)], 'Profile updated successfully.');
    
        }



       }
       

}
