<?php
namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use PHPUnit\Framework\Attributes\Test;
use Tests\TestCase;

class ProtectedRoutesTest extends TestCase
{
    use RefreshDatabase;

    #[Test]
    public function an_authenticated_user_can_access_protected_routes()
    {
        // Create a user and log them in
        $user  = User::factory()->create();
        $token = $user->createToken('authToken')->plainTextToken;

        // Send GET request to a protected route
        $response = $this->getJson('/api/products', [
            'Authorization' => "Bearer $token",
        ]);

        // Assert success response
        $response->assertStatus(200);
    }

    #[Test]
    public function an_unauthenticated_user_cannot_access_protected_routes()
    {
        // Send GET request without authentication
        $response = $this->getJson('/api/products');

        // Assert unauthorized response
        $response->assertStatus(401)
            ->assertJson(['message' => 'Unauthenticated.']);
    }
}