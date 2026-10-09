<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\CarreraController;

Route::inertia('/', 'welcome')->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::inertia('dashboard', 'dashboard')->name('dashboard');
});

Route::resource('carreras', CarreraController::class);
Route::get('/carreras/{carrera}/plan', [CarreraController::class, 'plan'])
    ->name('carreras.plan');


require __DIR__.'/settings.php';
