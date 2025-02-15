<?php
namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UserStoreUpdateRequest extends FormRequest
{
    // Authorize the request (set to true for now)
    public function authorize()
    {
        return true; // Change to authorization logic if needed
    }

    // Define validation rules
    public function rules()
    {
        $userId = $this->route('user')?->id;

        return [
            'name'     => 'required|string|max:255',
            'email'    => [
                'required',
                'email',
                'max:255',
                'unique:users,email,' . $userId,
            ],
            'username' => 'required',
            'password' => $this->isMethod('POST') ? 'required|string|min:8|confirmed' : 'required|string|min:8|confirmed',
        ];
    }
}
