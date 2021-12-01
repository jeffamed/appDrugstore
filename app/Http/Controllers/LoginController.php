<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\ValidationException;

class LoginController extends Controller
{
    public function login(Request $request)
    {
        $credentials = $request->validate([
            'email' => ['required', 'email'],
            'password' => ['required'],
        ]);

       if(Auth::attempt($credentials))
       {
            return response()->json(Auth::user(), 200);
       }
       throw ValidationException::withMessages([
           'email' => ['Las credenciales registradas anteriormente no coiniciden']
       ]);

    }
}
