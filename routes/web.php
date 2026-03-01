<?php

use App\Http\Controllers\CheatSheetController;
use Illuminate\Support\Facades\Route;

Route::get('/', [CheatSheetController::class, 'index'])->name('home');
Route::get('/links', [CheatSheetController::class, 'links'])->name('links');
Route::get('/characters', [CheatSheetController::class, 'characters'])->name('characters');
Route::get('/skills', [CheatSheetController::class, 'skills'])->name('skills');
Route::get('/races', [CheatSheetController::class, 'races'])->name('races');
Route::get('/builds', [CheatSheetController::class, 'builds'])->name('builds');
