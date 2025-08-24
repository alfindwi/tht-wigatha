<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\UserController;

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::post('/reset-password', [UserController::class, 'resetPassword']);
Route::post('/send-reset-password', [UserController::class, 'sendResetPasswordLink']);

Route::middleware('auth:api')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::apiResource('/product', ProductController::class);
    Route::put('/user/update', [UserController::class, 'updateProfile']);
});
