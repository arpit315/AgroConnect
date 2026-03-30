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
        Schema::create('users', function (Blueprint $col) {
            $col->id();
            $col->string('name');
            $col->string('email')->unique();
            $col->timestamp('email_verified_at')->nullable();
            $col->string('password');
            $col->string('role')->default('farmer');
            $col->string('phone')->nullable();
            $col->string('location')->nullable();
            $col->rememberToken();
            $col->timestamps();
        });

        Schema::create('password_reset_tokens', function (Blueprint $col) {
            $col->string('email')->primary();
            $col->string('token');
            $col->timestamp('created_at')->nullable();
        });

        Schema::create('sessions', function (Blueprint $col) {
            $col->string('id')->primary();
            $col->foreignId('user_id')->nullable()->index();
            $col->string('ip_address', 45)->nullable();
            $col->text('user_agent')->nullable();
            $col->longText('payload');
            $col->integer('last_activity')->index();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('users');
        Schema::dropIfExists('password_reset_tokens');
        Schema::dropIfExists('sessions');
    }
};
