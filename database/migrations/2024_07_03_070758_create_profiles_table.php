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
        Schema::create('profiles', function (Blueprint $table) {
            // Fields for Registration
            $table->id();
            $table->foreignId('user_id')->constrained()->unique()->onDelete('cascade');

            // profile_no format MMYY000001. Reset every month
            $table->string('profile_no', 10)->nullable();
            $table->string('name')->nullable();
            $table->integer('parent_id')->nullable();
            $table->integer('ref_id')->nullable();
            $table->date('registration_date')->nullable();
            $table->string('mobile', 15)->nullable();
            $table->string('pan', 10)->nullable();

            // After Registration Update Profile
            $table->boolean('pan_verified')->default(false);

            $table->string('address_1', 100)->nullable();
            $table->string('address_2', 100)->nullable();
            $table->string('city', 100)->nullable();
            $table->string('state', 100)->nullable();
            $table->string('pincode', 10)->nullable();

            $table->string('bank_name', 100)->nullable();
            $table->string('account_name', 100)->nullable();
            $table->string('account_no', 20)->nullable();
            $table->string('ifsc', 20)->nullable();
            $table->boolean('bank_verified')->default(false);

            $table->string('business_name', 100)->nullable();
            $table->string('gstin', 15)->nullable();
            $table->boolean('gstin_verified')->default(false);

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('profiles');
    }
};
