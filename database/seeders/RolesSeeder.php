<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class RolesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
           // Reset cached roles and permissions
       app()['cache']->forget('spatie.permission.cache');

       Role::create(['name' => 'admin']);
       Role::create(['name' => 'member']);

         // Create permissions
         Permission::create(['name' => 'update profile']);
  
          //Assign permissions to roles
         $memberRole = Role::findByName('member');
         $memberRole->givePermissionTo(['update profile']);
    }
}
