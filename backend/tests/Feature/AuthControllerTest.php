<?php
namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Hash;
use PHPUnit\Framework\Attributes\Test;
use Tests\TestCase;

class AuthControllerTest extends TestCase
{
    use RefreshDatabase;

    #[Test]
    public function a_user_can_register_successfully()
    {
        // Payload for registration
        $registrationData = [
            'name'                  => 'Test User',
            'email'                 => 'test@example.com',
            'password'              => 'password123',
            'password_confirmation' => 'password123',
        ];

        // Send POST request to register
        $response = $this->postJson('/api/register', $registrationData);

        // Assert response
        $response->assertStatus(201)
            ->assertJsonStructure([
                'data' => [
                    'user',
                    'token',
                ],
            ]);

        // Assert user is in the database
        $this->assertDatabaseHas('users', [
            'email' => 'test@example.com',
        ]);
    }

    #[Test]
    public function a_user_cannot_register_with_invalid_data()
    {
        // Send POST request with invalid data
        $response = $this->postJson('/api/register', [
            'name'                  => '',
            'email'                 => 'not-an-email',
            'password'              => 'short',
            'password_confirmation' => 'not-matching',
        ]);

        // Assert validation errors
        $response->assertStatus(422)
            ->assertJsonValidationErrors(['name', 'email', 'password']);
    }

    #[Test]
    public function a_user_can_log_in_with_valid_credentials()
    {
        // Create a user
        $user = User::factory()->create([
            'email'    => 'test@example.com',
            'password' => Hash::make('password123'),
        ]);

        // Send POST request to login
        $response = $this->postJson('/api/login', [
            'email'    => 'test@example.com',
            'password' => 'password123',
        ]);

        // Assert response
        $response->assertStatus(200)
            ->assertJsonStructure([
                'user' => [
                    'id', 'name', 'email',
                ],
                'access_token',
            ]);
    }

    #[Test]
    public function a_user_cannot_log_in_with_invalid_credentials()
    {
        // Create a user
        $user = User::factory()->create([
            'email'    => 'test@example.com',
            'password' => Hash::make('password123'),
        ]);

        // Send POST request with invalid credentials
        $response = $this->postJson('/api/login', [
            'email'    => 'test@example.com',
            'password' => 'wrongpassword',
        ]);

        // Assert unauthorized response
        $response->assertStatus(401)
            ->assertJson(['message' => 'The provided credentials are incorrect.']);
    }

    #[Test]
    public function an_authenticated_user_can_access_their_profile()
    {
        // Create a user and log them in
        $user  = User::factory()->create();
        $token = $user->createToken('authToken')->plainTextToken;

        // Send GET request with Bearer token
        $response = $this->getJson('/api/user', [
            'Authorization' => "Bearer $token",
        ]);

        // Assert response
        $response->assertStatus(200)
            ->assertJson([
                'id'    => $user->id,
                'name'  => $user->name,
                'email' => $user->email,
            ]);
    }

    #[Test]
    public function an_unauthenticated_user_cannot_access_their_profile()
    {
        // Send GET request without a token
        $response = $this->getJson('/api/user');

        // Assert unauthorized response
        $response->assertStatus(401)
            ->assertJson(['message' => 'Unauthenticated.']);
    }
}
