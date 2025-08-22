<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Throwable;

class ProductController extends Controller
{

    public function index()
    {
        try {
            $user = Auth::user();

            $products = Product::select('id', 'name', 'description', 'price', 'user_id')
                ->when($user->role !== 'admin', function ($query) use ($user) {
                    $query->where('user_id', $user->id);
                })
                ->get();

            return response()->json([
                'products' => $products
            ]);
        } catch (Throwable $th) {
            return response()->json([
                'message' => $th->getMessage()
            ]);
        }
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        try {
            $request->validate([
                'name' => 'required|string',
                'description' => 'nullable|string',
                'price' => 'required|numeric|min:0',
            ]);

            $product = Product::create([
                'name' => $request->name,
                'description' => $request->description,
                'price' => $request->price,
                'user_id' => Auth::id()
            ]);

            return response()->json([
                'product' => $product
            ]);
        } catch (Throwable $th) {
            return response()->json([
                'message' => $th->getMessage()
            ]);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        try {
            $user = Auth::user();

            $product = Product::select('id', 'name', 'description', 'price', 'user_id')
                ->with('user:id,name')
                ->where('id', $id)
                ->when($user->role !== 'admin', function ($query) use ($user) {
                    $query->where('user_id', $user->id);
                })
                ->firstOrFail();

            if (!$product) {
                return response()->json([
                    'message' => 'Product not found'
                ], 404);
            }

            return response()->json([
                'product' => $product
            ]);
        } catch (Throwable $th) {
            return response()->json([
                'message' => 'Product not found'
            ], 404);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        try {
            $user = Auth::user();

            $product = Product::where('id', $id)
                ->when($user->role !== 'admin', function ($query) use ($user) {
                    $query->where('user_id', $user->id);
                })
                ->first();

            if (!$product) {
                return response()->json(['message' => 'Product not found'], 404);
            }

            $product->update($request->all());

            return response()->json($product);
        } catch (Throwable $th) {
            return response()->json([
                'message' => 'Product not found'
            ], 404);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        try {
            $user = Auth::user();

            $product = Product::where('id', $id)
                ->when($user->role !== 'admin', function ($query) use ($user) {
                    $query->where('user_id', $user->id);
                })
                ->firstOrFail();


            if (!$product) {
                return response()->json([
                    'message' => 'Product not found'
                ], 404);
            }

            $product->delete();

            return response()->json(['message' => 'Product deleted']);
        } catch (Throwable $th) {
            return response()->json([
                'message' => 'Product not found'
            ], 404);
        }
    }
}
