<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Order;
use App\Models\Crop;

class OrderController extends Controller
{
    public function index(Request $request)
    {
        $user = $request->user();
        if ($user->role === 'farmer') {
            $orders = Order::with(['buyer', 'crop'])->where('farmer_id', $user->id)->latest()->get();
        } else {
            $orders = Order::with(['farmer', 'crop'])->where('buyer_id', $user->id)->latest()->get();
        }
        return response()->json($orders);
    }

    public function store(Request $request)
    {
        $request->validate([
            'crop_id' => 'required|exists:crops,_id',
            'quantity' => 'required|integer|min:1',
        ]);

        $crop = Crop::findOrFail($request->crop_id);
        
        $total_price = $crop->price * $request->quantity;

        $order = Order::create([
            'buyer_id' => $request->user()->id,
            'farmer_id' => $crop->farmer_id,
            'crop_id' => $crop->id,
            'quantity' => $request->quantity,
            'total_price' => $total_price,
            'status' => 'pending'
        ]);

        return response()->json($order, 201);
    }

    public function updateStatus(Request $request, $id)
    {
        $request->validate([
            'status' => 'required|in:pending,accepted,rejected,delivered'
        ]);

        $order = Order::where('farmer_id', $request->user()->id)->findOrFail($id);
        $order->update(['status' => $request->status]);

        return response()->json($order);
    }
}
