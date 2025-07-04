<?php

namespace Database\Seeders;

use App\Models\Product;
use Illuminate\Database\Seeder;

class ProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $products = [
            [
                'name' => 'Wireless Bluetooth Headphones',
                'description' => 'High-quality wireless headphones with noise cancellation and 30-hour battery life.',
                'price' => 99.99,
                'image' => 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop',
            ],
            [
                'name' => 'Smartphone Case',
                'description' => 'Durable protective case for smartphones with shock absorption technology.',
                'price' => 24.99,
                'image' => 'https://images.unsplash.com/photo-1603313011108-4f2d0c0c8c8c?w=400&h=400&fit=crop',
            ],
            [
                'name' => 'Laptop Stand',
                'description' => 'Adjustable aluminum laptop stand for better ergonomics and cooling.',
                'price' => 45.00,
                'image' => 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=400&h=400&fit=crop',
            ],
            [
                'name' => 'Wireless Mouse',
                'description' => 'Ergonomic wireless mouse with precision tracking and long battery life.',
                'price' => 35.50,
                'image' => 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400&h=400&fit=crop',
            ],
            [
                'name' => 'USB-C Cable',
                'description' => 'High-speed USB-C cable for fast charging and data transfer.',
                'price' => 12.99,
                'image' => 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&h=400&fit=crop',
            ],
            [
                'name' => 'Portable Charger',
                'description' => '10000mAh portable charger with fast charging capability.',
                'price' => 29.99,
                'image' => 'https://images.unsplash.com/photo-1609592806596-b43bada2f2d2?w=400&h=400&fit=crop',
            ],
        ];

        foreach ($products as $product) {
            Product::create($product);
        }
    }
}
