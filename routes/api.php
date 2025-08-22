<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\UserController;

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

Route::middleware('auth:api')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::apiResource('product', ProductController::class);
    Route::put('/user/update', [UserController::class, 'updateProfile']);
    Route::post('/user/send-reset-link', [UserController::class, 'sendResetPasswordLink']);
    Route::post('/user/reset-password', [UserController::class, 'resetPassword']);
});
