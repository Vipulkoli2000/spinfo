<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;

class UpdateProfileRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return false;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array 
    {
        return [
            'name'=>['required','string','max:100'],
            'mobile'=>['required', 'unique:profiles','regex:/^\+91[1-9][0-9]{9}$/'],
            'pan'=>['required','regex:/^([a-zA-Z]){5}([0-9]){4}([a-zA-Z0-9]){1}?$/','unique:profiles'], 
            'address_1' => ['max:100','string'],
            'address_2' => ['max:100', 'string'],
            'city'=> ['string', 'max:100'],
            'state'=>['string','max:100'],
            'pincode' => ['required', 'regex:/^[1-9][0-9]{2}\s{0,1}[0-9]{3}$/'],
            'bank_name' => ['string','max:100'],
            'account_name'=>['string', 'max:100'],
            'account_no' => ['string', 'max:20'],
            'ifsc' => ['required', 'regex:/^[A-Z]{4}0[A-Z0-9]{6}$/'],
            'business_name' => ['string', 'max:100'],
            'gstin' => ['string', 'max:15'],
        ];
    }

    protected function failedValidation(Validator $validator)
    {
        $errors = $validator->errors();
        throw new HttpResponseException(response()->json(['success'=>false, 'message' => $errors], 422));
    }

}
