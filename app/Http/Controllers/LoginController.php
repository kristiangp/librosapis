<?php

namespace App\Http\Controllers;

use App\Http\Requests\LoginRequest;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;

class LoginController extends Controller
{
    public function login(LoginRequest $request)
    {
        if (Auth::attempt($request->only(['email', 'password']))) {
            $user = $request->user();
            $tokenName = $request->input('token_name', 'default_token_name'); // Define un nombre por defecto para el token
            $token = $user->createToken($tokenName)->plainTextToken;

            return response()->json([
                'token' => $token,
                'message' => 'Success',
                'status' => true
            ]);
        }

        return response()->json([
            'message' => 'Unauthorized',
            'status' => false
        ], Response::HTTP_UNAUTHORIZED);
    }
}
