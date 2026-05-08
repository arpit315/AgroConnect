<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\CropController;
use App\Http\Controllers\RequirementController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\ChatController;
use App\Http\Controllers\SmartController;
use App\Http\Controllers\PublicController;
use App\Http\Controllers\ProfileController;

// Public routes
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::get('/public/landing-data', [PublicController::class, 'getLandingData']);

// Smart features public routes
Route::post('/smart/weather', [SmartController::class, 'getWeather']);
Route::post('/smart/predict-price', [SmartController::class, 'predictPrice']);
Route::post('/smart/recommend-crop', [SmartController::class, 'recommendCrop']);
Route::get('/smart/market-trends', [SmartController::class, 'marketTrends']);

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/me', function (Request $request) { return $request->user(); });
    Route::patch('/profile', [ProfileController::class, 'update']);
    
    // Crops
    Route::get('/crops', [CropController::class, 'index']);
    Route::get('/my-crops', [CropController::class, 'myCrops']);
    Route::get('/crops/{id}', [CropController::class, 'show']);
    Route::post('/crops', [CropController::class, 'store']);
    Route::put('/crops/{id}', [CropController::class, 'update']);
    Route::delete('/crops/{id}', [CropController::class, 'destroy']);

    // Requirements
    Route::get('/requirements', [RequirementController::class, 'index']);
    Route::get('/my-requirements', [RequirementController::class, 'myRequirements']);
    Route::get('/requirements/{id}', [RequirementController::class, 'show']);
    Route::post('/requirements', [RequirementController::class, 'store']);
    Route::put('/requirements/{id}', [RequirementController::class, 'update']);
    Route::delete('/requirements/{id}', [RequirementController::class, 'destroy']);

    // Orders
    Route::get('/orders', [OrderController::class, 'index']);
    Route::post('/orders', [OrderController::class, 'store']);
    Route::patch('/orders/{id}/status', [OrderController::class, 'updateStatus']);

    // Chat
    Route::get('/chat/conversations', [ChatController::class, 'getConversations']);
    Route::get('/chat/messages/{userId}', [ChatController::class, 'getMessages']);
    Route::post('/chat/send', [ChatController::class, 'sendMessage']);
});
