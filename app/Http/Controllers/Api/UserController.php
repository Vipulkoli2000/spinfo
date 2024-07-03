<?php

namespace App\Http\Controllers\Api;

use Validator;
use Carbon\Carbon;
use App\Models\User;
use App\Models\Profile;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use App\Http\Controllers\Controller;
use App\Http\Resources\UserResource;
use Illuminate\Support\Facades\Auth;
use App\Services\ProfileNumberService;
use App\Http\Controllers\Api\BaseController;

/**
 * @group User Management
 *
 * API for Managing Users
 */
class UserController extends BaseController
{
    /**
     * Register User
     */
    public function register(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(), [
             'name'=>'required|string|max:255',
             'email'=>['required', 'email:rfc,dns', 'unique:users'],
             'mobile'=>['required', 'unique:profiles','regex:/^\+(?:\d{1}|\d{3})(?:\x20?\d){5,14}\d$/'],
             'pan'=>['required','regex:/^([a-zA-Z]){5}([0-9]){4}([a-zA-Z0-9]){1}?$/','unique:profiles'],
             'password'=>'required|string|min:6|confirmed',
             'password_confirmation'=>'required',
             'parent'=>'required',
             'ref'=>'required'
        ]);

        // find id (parent_id) from profiles table where profile_no = parent and expiry_date >= today and expiry_date is not null
        // find id (ref_id) from profiles table where profile_no = ref and expiry_date >= today and expiry_date is not null



        if($validator->fails()){
            return $this->sendError('Validation Error.', $validator->errors());
        }

        $input = $request->all();
        $input['password'] = bcrypt($input['password']);

        $user = new User();
        $user->name = $input['name'];
        $user->email = $input['email'];
        $user->password = $input['password'];
        $user->save();

        $profile = new Profile();
        $profile->user_id = $user->id;
        $profile->name = $input['name'];
        $profile->mobile = $input['mobile'];
        $profile->pan = $input['pan'];
        $profile->parent_id = null;
        $profile->ref_id = null;
        // $profile->registration_date = Carbon::now()->format('Y-m-d');
        // $profileNumber = ProfileNumberService::generateProfileNumber();
        $profile->profile_no = $profileNumber;
        $profile->save();

        return $this->sendResponse(['user'=>new UserResource($user), 'profile'=>$profile], 'User register successfully.');
    }

     /**
     * Login User
     */
    public function login(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'email'=>['required','email'],
            'password'=>['required','string','min:6'],
        ]);

        if($validator->fails()){
           return $this->sendError('Validation Error.', $validator->errors());
        }

        if(Auth::attempt(['email' => $request->email, 'password' => $request->password])){
            $user = Auth::user()->load('profile'); //lazy loading
            $token =  $user->createToken($user->name)->plainTextToken;

            return $this->sendResponse(['user'=>new UserResource($user), 'token'=>$token], 'User login successfully.');

        } else{
            return $this->sendError('Invalid Credentials.', ['error'=>'Invalid Credentials']);
        }
    }

    /**
     * Update Profile
     * @bodyParam user_id int required This is logged in user_id
     * @bodyParam amount decimal Amount paid by User
     * @bodyParam email string required email User's valid Email
     */
    public function update(): JsonResponse
    {

    }

     /**
     * Logout User
     */
    public function logout(Request $request): JsonResponse
    {
        $request->user()->currentAccessToken()->delete();
        return $this->sendResponse([], 'User logged out successfully.');
    }

}
