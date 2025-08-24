<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class UserController extends Controller
{
    public function updateProfile(Request $request)
    {
        $request->validate([
            'name' => 'string|max:100',
        ]);

        $user = User::find(Auth::id());
        $user->update([
            'name' => $request->name,
        ]);

        $user->refresh();

        return response()->json([
            'message' => 'Profile updated successfully',
            'user' => $user
        ]);
    }


    public function sendResetPasswordLink(Request $request)
    {
        $request->validate(['email' => 'required|email']);

        $user = User::firstWhere('email', $request->email);
        if (!$user) {
            return response()->json(['message' => 'Email not found'], 404);
        }

        $token = Str::random(60);

        DB::table('password_resets')->updateOrInsert(
            ['email' => $user->email],
            ['token' => $token, 'created_at' => now()]
        );

        $resetUrl = "http://localhost:5173/reset-password?token=" . $token;

        $html = "
        <h1>Reset Password Request</h1>
        <p>Klik link di bawah untuk reset password kamu:</p>
        <a href='{$resetUrl}'>Reset Password</a>
    ";

        Mail::html($html, function ($message) use ($user) {
            $message->to($user->email)
                ->subject('Reset Password Request');
        });

        return response()->json(['message' => 'Reset password link sent to email']);
    }

    public function resetPassword(Request $request)
    {
        $request->validate([
            'token' => 'required',
            'password' => 'required|confirmed|min:6'
        ]);

        $reset = DB::table('password_resets')
            ->where('token', $request->token)
            ->first();

        if (!$reset) {
            return response()->json(['message' => 'Invalid token'], 400);
        }

        $user = User::firstWhere('email', $reset->email);
        $user->update([
            'password' => Hash::make($request->password)
        ]);

        DB::table('password_resets')->where('email', $reset->email)->delete();

        return response()->json(['message' => 'Password successfully updated']);
    }
}
