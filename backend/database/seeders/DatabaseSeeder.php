<?php
namespace Database\Seeders;

use App\Models\User;
use App\Models\Product;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Create a user
        $user = User::factory()->create([
            'name'     => 'Paul Henry',
            'username' => 'Paully',
            'email'    => 'paul@gmail.com',
            'password' => bcrypt('password'), 
        ]);

        // Create 5 products for the user
        Product::factory(5)->create([
            'user_id' => $user->id, 
        ]);
    }
}
