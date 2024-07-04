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
        Schema::table('profiles', function (Blueprint $table) {
            $table->date('expiry_date')->nullable()->after('registration_date');
            $table->integer('level_8')->default(0)->after('gstin_verified');
            $table->integer('level_7')->default(0)->after('gstin_verified');
            $table->integer('level_6')->default(0)->after('gstin_verified');
            $table->integer('level_5')->default(0)->after('gstin_verified');
            $table->integer('level_4')->default(0)->after('gstin_verified');
            $table->integer('level_3')->default(0)->after('gstin_verified');
            $table->integer('level_2')->default(0)->after('gstin_verified');
            $table->integer('level_1')->default(0)->after('gstin_verified');
            $table->integer('direct_count')->default(0)->after('gstin_verified');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('profiles', function (Blueprint $table) {
            $table->dropColumn('expiry_date');
            $table->dropColumn('direct_count');
            $table->dropColumn('level_1');
            $table->dropColumn('level_2');
            $table->dropColumn('level_3');
            $table->dropColumn('level_4');
            $table->dropColumn('level_5');
            $table->dropColumn('level_6');
            $table->dropColumn('level_7');
            $table->dropColumn('level_8');

        });
    }
};
