<?php
namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\UserStoreUpdateRequest;
use App\Models\User;

class UserController extends Controller
{

    public function index()
    {
        $response = User::all();
        return response()->json($response);
    }

    public function show(User $user)
    {
        $response = User::findOrFail($user->id);
        return response()->json($response);
    }


    public function update(User $user, UserStoreUpdateRequest $request)
    {
        // Retrieve the validated data
        $validated = $request->validated();

        // If the password is being updated, hash it
        if (isset($validated['password'])) {
            $validated['password'] = bcrypt($validated['password']);
        }

        // Update the user with the validated data
        $user->update($validated);

        // Return a JSON response
        return response()->json([
            'message' => 'User updated successfully',
            'user'    => $user,
        ], 200);
    }

    public function destroy(User $user)
    {
        // Delete the user
        $user->delete();

        // Return a success response
        return response()->json([
            'message' => 'User deleted successfully',
        ], 200);
    }
}
