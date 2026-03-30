<?php

namespace App\Http\Controllers;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

use Illuminate\Http\Request;

class AuthController extends Controller
{
    // Implement Register, Login, and Logout logic here
    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'email' => 'required|string|unique:users|max:255|email',
            'password' => 'required|string|min:4',
            'role' => 'required|in:farmer,vendor',
        ]);
        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'role' => $request->role,

        ]);

        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'message' => 'User registered successfully',
            'user' => $user,
            'token' => $token,
        ], 201);
    }
    public function login(Request $request)
    {
        \Illuminate\Support\Facades\Log::info("Login Attempt via API", ['email' => $request->email]);
        
        $email = $request->email;
        $password = $request->password;
        $user = User::where('email', $request->email)->first();
        if (!$user) {
            \Illuminate\Support\Facades\Log::warning("Login Failed: User Not Found", ['email' => $request->email]);
            return response()->json(['message' => 'user not found'], 404);
        }
        if (!Hash::check($password, $user->password)) {
            \Illuminate\Support\Facades\Log::warning("Login Failed: Invalid Password", ['email' => $request->email]);
            return response()->json(['message' => 'invalid password'], 401);
        }
        $user->tokens()->delete();
        $token = $user->createToken('auth_token')->plainTextToken;
        
        \Illuminate\Support\Facades\Log::info("Login Successful", ['email' => $request->email]);
        return response()->json([
            'message' => 'user logged in successfully',
            'user' => $user,
            'token' => $token,
        ], 200);
    }

    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();
        return response()->json([
            'message' => 'user logged out successfully'
        ], 200);
    }
}


