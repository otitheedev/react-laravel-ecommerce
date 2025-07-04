<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    public function index()
    {
        $products = Product::all();
        return $this->apiResponse($products);
    }

    public function show($id)
    {
        $product = Product::findOrFail($id);
        return $this->apiResponse($product);
    }
} 