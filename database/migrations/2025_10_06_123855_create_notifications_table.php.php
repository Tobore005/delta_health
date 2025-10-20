<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('notifications', function (Blueprint $table) {
            $table->uuid('id')->primary(); // Use UUID for unique IDs
            $table->string('type'); // Notification class
            $table->morphs('notifiable'); // Adds notifiable_id and notifiable_type
            $table->json('data'); // JSON payload for notification details
            $table->timestamp('read_at')->nullable(); // When it was read
            $table->timestamps(); // created_at & updated_at
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('notifications');
    }
};
