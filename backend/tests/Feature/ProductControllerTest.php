<?php

namespace Tests\Feature;

use App\Models\User;
use App\Models\Product;
use Illuminate\Foundation\Testing\RefreshDatabase;
use PHPUnit\Framework\Attributes\Test;
use Tests\TestCase;

class ProductControllerTest extends TestCase
{
    use RefreshDatabase;

    protected $user;

    protected function setUp(): void
    {
        parent::setUp();

        // Create a user to test authentication
        $this->user = User::factory()->create();
    }

    #[Test]
    public function authenticated_user_can_create_a_product()
    {
        // Authenticate the user
        $this->actingAs($this->user);

        // Payload for the product
        $productData = [
            'name' => 'Test Product',
            'description' => 'This is a test product.',
            'price' => 99.99,
            'stock' => 10,
        ];

        // Send POST request to create a product
        $response = $this->postJson('/api/products', $productData);

        // Assert the response
        $response->assertStatus(201)
            ->assertJson([
                'message' => 'Product created successfully',
                'product' => $productData,
            ]);

        // Assert the product exists in the database
        $this->assertDatabaseHas('products', [
            'name' => 'Test Product',
            'user_id' => $this->user->id,
        ]);
    }

    #[Test]
    public function authenticated_user_can_list_only_their_products()
    {
        // Authenticate the user
        $this->actingAs($this->user);

        // Create products for the user
        Product::factory()->count(3)->create(['user_id' => $this->user->id]);

        // Create products for another user
        $otherUser = User::factory()->create();
        Product::factory()->count(2)->create(['user_id' => $otherUser->id]);

        // Send GET request to list products
        $response = $this->getJson('/api/products');

        // Assert the response
        $response->assertStatus(200);

        // Ensure only this user's products are returned
        $this->assertCount(3, $response->json('data'));
    }

    #[Test]
    public function authenticated_user_can_update_their_product()
    {
        // Authenticate the user
        $this->actingAs($this->user);

        // Create a product for the user
        $product = Product::factory()->create(['user_id' => $this->user->id]);

        // Update payload
        $updatedData = [
            'name' => 'Updated Product',
            'description' => 'Updated description.',
            'price' => 150.50,
            'stock' => 20,
        ];

        // Send PUT request to update the product
        $response = $this->putJson("/api/products/{$product->id}", $updatedData);

        // Assert the response
        $response->assertStatus(200)
            ->assertJson([
                'message' => 'Product updated successfully',
                'product' => $updatedData,
            ]);

        // Assert the product data is updated in the database
        $this->assertDatabaseHas('products', [
            'id' => $product->id,
            'name' => 'Updated Product',
        ]);
    }

    #[Test]
    public function authenticated_user_cannot_update_other_users_products()
    {
        // Authenticate the user
        $this->actingAs($this->user);

        // Create a product for another user
        $otherUser = User::factory()->create();
        $product = Product::factory()->create(['user_id' => $otherUser->id]);

        // Attempt to update the other user's product
        $response = $this->putJson("/api/products/{$product->id}", [
            'name' => 'Illegal Update',
            'price' => 22.2,
            'stock' => 23,
        ]);

        // Assert unauthorized response
        $response->assertStatus(403);
    }

    #[Test]
    public function authenticated_user_can_delete_their_product()
    {
        // Authenticate the user
        $this->actingAs($this->user);

        // Create a product for the user
        $product = Product::factory()->create(['user_id' => $this->user->id]);

        // Send DELETE request to delete the product
        $response = $this->deleteJson("/api/products/{$product->id}");

        // Assert the response
        $response->assertStatus(200)
            ->assertJson(['message' => 'Product deleted successfully']);

        // Assert the product is deleted from the database
        $this->assertDatabaseMissing('products', [
            'id' => $product->id,
        ]);
    }

    #[Test]
    public function authenticated_user_cannot_delete_other_users_products()
    {
        // Authenticate the user
        $this->actingAs($this->user);

        // Create a product for another user
        $otherUser = User::factory()->create();
        $product = Product::factory()->create(['user_id' => $otherUser->id]);

        // Attempt to delete the other user's product
        $response = $this->deleteJson("/api/products/{$product->id}");

        // Assert unauthorized response
        $response->assertStatus(403);
    }
}
