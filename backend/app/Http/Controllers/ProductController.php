<?php
namespace App\Http\Controllers;

use App\Http\Requests\ProductStoreUpdateRequest;
use App\Models\Product;

class ProductController extends Controller
{
    // List all products
    public function index()
    {
        $limit  = request()->input('limit', 10);
        $search = request()->input('search', '');

        $query = auth()->user()->products();

        if (! empty($search)) {
            $query->where('name', 'like', "%{$search}%")
                ->orWhere('description', 'like', "%{$search}%");
        }

        $products = $query->paginate($limit);

        return response()->json([
            'data'         => $products->items(),
            'total'        => $products->total(),
            'per_page'     => $products->perPage(),
            'current_page' => $products->currentPage(),
            'last_page'    => $products->lastPage(),
        ]);
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
