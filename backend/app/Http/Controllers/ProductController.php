<?php
namespace App\Http\Controllers;

use App\Http\Requests\ProductStoreUpdateRequest;
use App\Models\Product;

class ProductController extends Controller
{
    // List all products
    public function index()
    {
        $products = auth()->user()->products;

        return response()->json($products);
    }

    // Add a new product
    public function store(ProductStoreUpdateRequest $request)
    {
        $validated = $request->validated();

        $product = auth()->user()->products()->create($validated);

        return response()->json([
            'message' => 'Product created successfully',
            'product' => $product,
        ], 201);
    }

    // Show a single product
    public function show(Product $product)
    {
        if ($product->user_id !== auth()->id()) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        return response()->json($product);
    }

    // Update a product
    public function update(ProductStoreUpdateRequest $request, Product $product)
    {
        if ($product->user_id !== auth()->id()) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $validated = $request->validated();

        $product->update($validated);

        return response()->json([
            'message' => 'Product updated successfully',
            'product' => $product,
        ]);
    }

    // Delete a product
    public function destroy(Product $product)
    {
        if ($product->user_id !== auth()->id()) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $product->delete();

        return response()->json([
            'message' => 'Product deleted successfully',
        ]);
    }
}
