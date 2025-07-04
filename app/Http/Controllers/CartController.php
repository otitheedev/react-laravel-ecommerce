<?php

namespace App\Http\Controllers;

use App\Models\Cart;
use App\Models\CartItem;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class CartController extends Controller
{
    // Get the current user's or guest's cart
    protected function getCart(Request $request)
    {
        if (Auth::check()) {
            $cart = Cart::firstOrCreate(['user_id' => Auth::id()]);
        } else {
            $sessionId = $request->session()->getId();
            $cart = Cart::firstOrCreate(['session_id' => $sessionId]);
        }
        return $cart;
    }

    public function index(Request $request)
    {
        $cart = $this->getCart($request)->load('cartItems.product');
        return $this->apiResponse($cart);
    }

    public function add(Request $request)
    {
        $request->validate([
            'product_id' => 'required|exists:products,id',
            'quantity' => 'required|integer|min:1',
        ]);
        $cart = $this->getCart($request);
        $item = $cart->cartItems()->where('product_id', $request->product_id)->first();
        if ($item) {
            $item->quantity += $request->quantity;
            $item->save();
        } else {
            $cart->cartItems()->create([
                'product_id' => $request->product_id,
                'quantity' => $request->quantity,
            ]);
        }
        return $this->apiResponse($cart->load('cartItems.product'), 'Product added to cart');
    }

    public function update(Request $request, $itemId)
    {
        $request->validate([
            'quantity' => 'required|integer|min:1',
        ]);
        $cart = $this->getCart($request);
        $item = $cart->cartItems()->where('id', $itemId)->firstOrFail();
        $item->quantity = $request->quantity;
        $item->save();
        return $this->apiResponse($cart->load('cartItems.product'), 'Cart item updated');
    }

    public function remove(Request $request, $itemId)
    {
        $cart = $this->getCart($request);
        $item = $cart->cartItems()->where('id', $itemId)->firstOrFail();
        $item->delete();
        return $this->apiResponse($cart->load('cartItems.product'), 'Cart item removed');
    }

    public function clear(Request $request)
    {
        $cart = $this->getCart($request);
        $cart->cartItems()->delete();
        return $this->apiResponse($cart->load('cartItems.product'), 'Cart cleared');
    }
} 