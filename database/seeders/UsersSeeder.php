<?php

namespace Database\Seeders;

use Carbon\Carbon;
use App\Models\User;
use App\Models\Profile;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use App\Services\ProfileNumberService;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class UsersSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {

        $admin = User::create([
            'name' => 'Admin',
            'email' => 'admin@spinfo.com',
            'password' => bcrypt('abcd123'), 
        ]);

        $user = User::create([
            'name' => 'Spinfo',
            'email' => 'spinfo@gmail.com',
            'password' => bcrypt('abcd123'), 
        ]);

        $memberUser = Profile::create([
            'profile_no' => ProfileNumberService::generateProfileNumber(),
            'user_id' => 2,
            'name'=>'Spinfo',
            'registration_date' => Carbon::now()->format('Y-m-d'),
            'expiry_date' => Carbon::parse(Carbon::now()->format('Y-m-d'))
            ->addYear()
            ->subDay()
            ->format('Y-m-d'),
        ]);

       $adminRole = Role::where('name', 'admin')->first();
       $admin->assignRole($adminRole);

        // Assign member role to the member user
       $memberRole = Role::where('name', 'member')->first();
       $user->assignRole($memberRole);
    }
}
