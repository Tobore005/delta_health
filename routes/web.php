<?php

use App\Http\Controllers\Admin\AdminDashboardController;
use App\Http\Controllers\Admin\AdminHealthInfoController;
use App\Http\Controllers\Admin\ClinicController;
use App\Http\Controllers\Admin\UserController;
use App\Http\Controllers\Clinic\ClinicAppointmentController;
use App\Http\Controllers\Clinic\ClinicDashboardController;
use App\Http\Controllers\Clinic\ClinicNotificationController;
use App\Http\Controllers\Clinic\ClinicProfileController;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\ContactMessageController;
use App\Http\Controllers\HealthInfoController;
use App\Http\Controllers\Admin\AdminNotificationController;
use App\Http\Controllers\Admin\AdminProfileController;
use App\Http\Controllers\User\UserAppointmentController;
use App\Http\Controllers\User\UserDashboardController;
use App\Http\Controllers\User\UserNotificationController;
use App\Http\Controllers\User\UserProfileController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');
Route::get('/about', function () {
    return Inertia::render('about');
})->name('about');
Route::get('/contact', [ContactController::class, 'index'])->name('contact');
Route::post('/contact-message', [ContactMessageController::class, 'store'])->name('contact.message');

Route::get('/dashboard/health-info', [HealthInfoController::class, 'index'])->name('health-info');

Route::middleware(['auth:web'])->prefix('dashboard/user')->group(function () {
    Route::get('/', [UserDashboardController::class, 'index'])->name('user.dashboard');

    Route::get('/appointments', [UserAppointmentController::class, 'index'])->name('user.appointments');
    Route::post('/appointments', [UserAppointmentController::class, 'store'])->name('user.appointments.store');

    Route::get('/profile', [UserProfileController::class, 'index'])->name('user.profile');
    Route::put('/profile', [UserProfileController::class, 'update'])->name('user.profile.update');

    Route::get('/notifications', [UserNotificationController::class, 'index'])->name('user.notifications');
    Route::put('/notifications/{id}/read', [UserNotificationController::class, 'markAsRead'])->name('user.notifications.read');
});

// ✅ Clinic Dashboard Routes
Route::middleware(['auth:clinic'])->prefix('dashboard/clinic')->group(function () {
    Route::get('/', [ClinicDashboardController::class, 'index'])->name('clinic.dashboard');

    Route::get('/appointments', [ClinicAppointmentController::class, 'index'])->name('clinic.appointments');
    Route::post('/appointments', [ClinicAppointmentController::class, 'store'])->name('clinic.appointments.store');
    Route::put('/appointments/{id}/approve', [ClinicAppointmentController::class, 'approve'])->name('clinic.appointments.approve');
    Route::put('/appointments/{id}/reject', [ClinicAppointmentController::class, 'reject'])->name('clinic.appointments.reject');
    Route::put('/appointments/{id}/complete', [ClinicAppointmentController::class, 'complete'])->name('clinic.appointments.complete');
    Route::put('/appointments/{id}/activate', [ClinicAppointmentController::class, 'activate'])->name('clinic.appointments.activate');   
    Route::put('/appointments/{id}/reschedule', [ClinicAppointmentController::class, 'reschedule'])->name('clinic.appointments.reschedule');    
    
    Route::get('/profile', [ClinicProfileController::class, 'index'])->name('clinic.profile');
    Route::put('/profile', [ClinicProfileController::class, 'update'])->name('clinic.profile.update');
    
    Route::get('/notifications', [ClinicNotificationController::class, 'index'])->name('clinic.notifications');
    Route::put('/notifications/{id}/read', [ClinicNotificationController::class, 'markAsRead'])->name('clinic.notifications.read');
});

Route::middleware(['auth:admin'])->prefix('dashboard/admin')->group(function () {
    Route::get('/', [AdminDashboardController::class, 'index'])->name('admin.dashboard');
    Route::get('/articles', [AdminHealthInfoController::class, 'index'])->name('articles');
    Route::post('/articles', [AdminHealthInfoController::class, 'store'])->name('articles.store');

    Route::get('/clinics', [ClinicController::class, 'index'])->name('clinic.directory');
    Route::get('/clinics/{clinic}', [ClinicController::class, 'show'])->name('clinic.directory.show');
    Route::put('/clinics/{id}/approve', [ClinicController::class, 'approve'])->name('clinics.approve');
    Route::put('/clinics/{id}/unapprove', [ClinicController::class, 'unapprove'])->name('clinics.unapprove');

    Route::get('/users', [UserController::class, 'index'])->name('user.directory');
    Route::get('/users/{user}', [UserController::class, 'show'])->name('user.directory.show');

    Route::get('/profile', [AdminProfileController::class, 'index'])->name('admin.profile');
    Route::put('/profile', [AdminProfileController::class, 'update'])->name('admin.profile.update');
    
    Route::get('/notifications', [AdminNotificationController::class, 'index'])->name('admin.notifications');
    Route::put('/notifications/{id}/read', [AdminNotificationController::class, 'markAsRead'])->name('admin.notifications.read');
});


require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
